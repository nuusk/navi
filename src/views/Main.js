import React, { Component } from 'react';

//importowanie komponentów
import Navi from '../components/Navi/Navi';
import SpeechBalloon from '../components/SpeechBalloon/SpeechBalloon';

//AlertBalloon to komponent ktory wyswietla taki alert jaki jest stan this.state.alert.
//komponent ten zyje tylko 4 sekundy. zaorowno jego animacja trwa 3 sekundy,
//jak i stan this.state.alert zostaje wyzerowany po 3 sekundach od momentu nadania mu wartosci
import AlertBalloon from '../components/AlertBalloon/AlertBalloon';
import PlaceInfo from '../components/PlaceInfo/PlaceInfo';
import QueryField from '../components/QueryField/QueryField';
import Logo from '../components/Logo/Logo';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import LoginForm from '../components/LoginForm/LoginForm';
import ViewButton from '../components/ViewButton/ViewButton';
import User from '../components/User/User';

import naviQuotes from '../utilities/quotes.json';

import axios from 'axios';

import './setting.css';

class Main extends Component {
  constructor(props) {
    super(props);

    this.setQuery = this.setQuery.bind(this);
    this.getData = this.getData.bind(this);
    this.animate = this.animate.bind(this);
    this.populateVoiceList = this.populateVoiceList.bind(this);
    this.metamorphosis = this.metamorphosis.bind(this);
    this.triggerMenu = this.triggerMenu.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.registerForm = this.registerForm.bind(this);
    this.loginForm = this.loginForm.bind(this);
    this.mainView = this.mainView.bind(this);

    this.synth = window.speechSynthesis;
    this.speech = new SpeechSynthesisUtterance();
    this.voices = [];

    //stan, który definiuje zachowanie
    //wszystkich komponentów w danym widoku
    this.state = {
      searching: false,
      query: '',
      results: [],
      latitude: '',
      longitude: '',
      animation: 'starting',
      dialogue: 'hidden',
      placeName: '',
      placeAddress: '',
      placeLat: '',
      placeLng: '',
      placeRating: '',
      view: 'query',
      menu: true,
      registerSuccess: false,
      emailAlreadyUsed: false,
      username: '',
      formAnimation: '',
      alert: null
    };
  }

  //funkcja ta jest wywoływana przez komponent QueryField,
  //kiedy użytkownik wpisze zapytanie
  //informacja o tym, że navi szuka odpowiedzi,
  //trafi następnie do komponentu Navi
  //komponent Navi dostosuje swój stan
  //(w tym przypadku animacje) do podanej wartości
  setSearching(value = true) {
    this.setState({
      searching: value
    });
  }

  //funkcja ta jest wywoływana za każdym razem,
  //kiedy zmieni się wartość zapytania
  //wprowadzanego przez użytkownika
  setQuery(value) {
    this.setState({
      query: value
    });
  }

  animate(animation) {
    this.setState({
      animation: animation
    });
  }

  populateVoiceList() {
    this.voices = this.synth.getVoices();
  }

  triggerMenu() {

    this.setState({
      menu: !this.state.menu
    });
    console.log('menu jest ' + this.state.menu);
  }

  //funkcja ta jest wywoływana,
  //kiedy użytkownik wpisze zapytanie
  getData(query) {
    // console.log(query);
    //informacja o zmianie stanu
    //zostanie przekazana do komponentu Navi
    this.setState({
      animation: 'loading',
      view: 'dialogue'
    });
    //żądanie GET zostaje wysłane
    //na adres dostarczany przez API
    fetch('http://localhost:9004/api/message?name='
    +encodeURIComponent(query.toLowerCase())
    +'&lat='+this.state.latitude
    +'&lng='+this.state.longitude, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      this.setState({
        animation: 'dialogue',
      });
      document.getElementById('balloon').classList.toggle('swap-a');
      document.getElementById('balloon').classList.toggle('swap-b');
      return res.json();
    })
    .then(result => {
      //jeśli to co otrzymaliśmy w odpowiedzi
      //jest miejscem to wiemy, że Navi
      //zaproponuje to miejsce użytkownikowi
      if (result.location) {
        this.speech.text = naviQuotes.proposition[Math.floor(Math.random() * (naviQuotes.proposition.length))];
        this.setState({
          animation: 'dialogue',
          dialogue: 'appear',
          response: this.speech.text,
          placeName: result.name,
          placeAddress: result.address,
          placeLat: result.location.lat,
          placeLng: result.location.lng,
          placeRating: result.rating
        });
        this.synth.speak(this.speech);
      } else if (result === "login") {
        this.loginForm();
      } else if (result === "logout") {
        this.logout();
      } else if (result === "register") {
        this.registerForm();
      } else if (result === "nod") {
        this.speech.text = naviQuotes.nod[Math.floor(Math.random() * (naviQuotes.nod.length))];
        this.synth.speak(this.speech);
        this.setState({
          alert: this.speech.text
        });
        setTimeout(function(){
          this.setState({
            alert: null
          });
        }.bind(this), 3000);
      } else {
        this.setState({
          animation: 'dialogue',
          response: result,
          dialogue: 'appear'
        });
        this.speech.text = result;
        this.synth.speak(this.speech);
      }
    })
    .catch(err => {
      console.error('!Request failed! ~ ', err);
      this.setState({
        animation: 'idle'
      });
    });
  }

  //geolokalizacja jest walidowana tylko w przypadku,
  //jeśli przeglądarka wspiera ten moduł
  componentWillMount() {
    if (!navigator.geolocation){
      console.log("Geolocation is not supported by your browser");
      return null;
    }

    //jeśli udało się zlokalizować położenie,
    //zmieniany jest stan głównego komponentu
    //te wartości będą wykorzystywane
    //podczas zapytań do określenia pozycji użytkownika
    const success = (position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }

    //jeśli nie udało się zlokalizować użytkownika
    //z jakiegokolwiek powodu, wywoływana jest funkcja error
    function error() {
      console.log("Unable to retrieve your location");
    }

    //przekierowanie na odpowiednią funkcję
    //w zależności od stanu powodzenia geolokalizacji
    navigator.geolocation.getCurrentPosition(success, error);
  }

  componentDidUpdate() {
    //jesli jeszce nie mamy listy glosow, wybieramy z nich Zosie i przypisujemy do Navi
    if (this.voices.length == 0) {
      this.populateVoiceList();
      this.voices.forEach(voice => {
        if(voice.name === "Zosia") {
          this.speech.voice = voice;

          //losowy pitch
          this.speech.pitch = 0.3;

          //0.8 sprawdza sie swietnie.
          this.speech.rate = 0.8;
        }
      });
    }
  }

  //change navi
  metamorphosis() {
    if (!this.state.alert) {
      this.speech.text = naviQuotes.metamorphosis[Math.floor(Math.random() * (naviQuotes.metamorphosis.length))];
      this.speech.pitch += Math.random();
      this.speech.pitch %= 2;
      this.synth.speak(this.speech);
      if (!this.state.alert) {
        this.setState({
          alert: "Zmieniono głos Navi."
        });
        setTimeout(function(){
          this.setState({
            alert: null
          });
        }.bind(this), 3000);
      }
    }
  }

  register() {
    let newUser = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };
    fetch('http://localhost:9004/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser)
    }).then(result => {
      if(result.status === 200) {
        this.setState({
          registerSuccess: true,
          view: 'login',
          alert: 'Zarejestrowano.'
        });
        setTimeout(function() {
          this.setState({
            alert: null
          });
        }.bind(this), 3000);
      } else if (result.status === 409){
        this.setState({
          emailAlreadyUsed: true
        });
      }
    }).catch(error => console.log('error============:', error));
  }

  login() {
      axios.post('http://localhost:9004/api/login', {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
      })
      .then((res) => {
        let user = JSON.parse(res.config.data);
        console.log(res.config);
        if (user.email) {
          this.setState({
            view: 'query',
            username: user.email,
            animation: 'starting',
            alert: 'Pomyślnie zalogowano.'
          });
          setTimeout(function() {
            this.setState({
              alert: null
            });
          }.bind(this), 3000);
        } else {
          this.setState({
            formAnimation: 'wrong'
          });
          setTimeout(function() {
            this.setState({
              formAnimation: ''
            });
          }.bind(this), 1000);
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          formAnimation: 'wrong'
        });
        setTimeout(function() {
          this.setState({
            formAnimation: ''
          });
        }.bind(this), 1000);
      });
  }

  logout() {
    if (this.state.username) {
      this.speech.text = naviQuotes.goodbye[Math.floor(Math.random() * (naviQuotes.goodbye.length))];
      axios.get('http://localhost:9004/api/logout')
      .then((res) => {
        console.log(res);
        this.setState({
          username: null,
          placeName: '',
          placeAddress: '',
          placeLat: '',
          placeLng: '',
          placeRating: '',
          response: '',
          view: 'query',
          animation: 'starting',
          alert: 'Pomyślnie wylogowano'
        });
        setTimeout(function() {
          this.setState({
            alert: null
          });
        }.bind(this), 3000);
      })
      .catch((error) => {
        console.log(error);
      });
      console.log('asd');
      console.log(this.state.username);
      this.setState({
        username: null
      });
      this.synth.speak(this.speech);
    } else {
      this.setState({
        alert: "Nie jesteś zalogowany."
      });
      setTimeout(function() {
        this.setState({
          alert: null
        });
      }.bind(this), 3000);
    }
  }

  loginForm() {
    if (!this.state.username) {
      this.setState({
        view: 'login',
        animation: 'login'
      });
    } else {
      this.setState({
        alert: "Już jesteś zalogowany."
      });
      setTimeout(function() {
        this.setState({
          alert: null
        });
      }.bind(this), 3000);
    }
  }

  mainView() {
    this.setState({
      view: 'query',
      animation: 'starting'
    });
  }

  registerForm() {
    this.setState({
      view: 'register',
      animation: 'login'
    });
  }

  render() {
    // this.populateVoiceList();
    //zmienna view zawiera główne komponenty
    let view;
    //w zależności od stanu widoku Main.js,
    //zmieniamy główne komponenty
    switch (this.state.view) {
      case 'query':
        view = (
          <span>
          <Logo />
          <QueryField query={this.state.query}
                      setQuery={this.setQuery}
                      getData={this.getData}
                      position="center"
                      animate={this.animate} />

          <Navi       animation={this.state.animation}
                      view={this.state.view}
                      metamorphosis={this.metamorphosis}/>
          </span>
        )
        break;
    case 'register':
      view = (
        <span>
        <Logo />
        <Navi       animation={this.state.animation}
                    view={this.state.view}
                    metamorphosis={this.metamorphosis}/>
        <RegisterForm onSubmit={this.register}
                      animation={this.state.formAnimation}/>
        </span>
      )
      break;
    case 'login':
      view = (
        <span>
        <Logo />
        <Navi       animation={this.state.animation}
                    view={this.state.view}
                    metamorphosis={this.metamorphosis}/>
        <LoginForm onSubmit={this.login}
                    animation={this.state.formAnimation}/>
        </span>
      )
      break;
    case 'dialogue':
      view = (
        <span>
        <Logo />

        <QueryField query={this.state.query}
                    setQuery={this.setQuery}
                    getData={this.getData}
                    position="top"
                    animate={this.animate}/>
        <div className="grid-wrapper">
        <Navi       animation={this.state.animation}
                    view={this.state.view}
                    metamorphosis={this.metamorphosis}/>
        <SpeechBalloon response={this.state.response}
                       dialogue={this.state.dialogue}/>
        </div>
        <PlaceInfo  placeName={this.state.placeName}
                    placeAddress={this.state.placeAddress}
                    placeLat={this.state.placeLat}
                    placeLng={this.state.placeLng}
                    placeRating={this.state.placeRating} />

        </span>
      )
      break;
     default:
      break;
    }
    return (
      <div className="main-view">
        <div className="menu">
          <ViewButton viewName="trigger-menu" onClick={this.triggerMenu} mode={this.state.menu ? 'on' : 'off'}/>
          {this.state.menu &&
            <span>
              <ViewButton viewName="main" onClick={this.mainView} />
              {this.state.username &&
                <ViewButton viewName="logout" onClick={this.logout} />
              }
              {!this.state.username &&
                <span>
                  <ViewButton viewName="login" onClick={this.loginForm} />
                  <ViewButton viewName="register" onClick={this.registerForm} />
                </span>
              }
            </span>
          }
        </div>
        {this.state.username &&
          <User username={this.state.username} />
        }
        { view }
        {this.state.alert &&
          <AlertBalloon alert={this.state.alert} />
        }
      </div>
    );
  }

}

export default Main;
