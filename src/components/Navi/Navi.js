import React, { Component } from 'react';
import './Navi.css';

//element Navi implementuje klasę komponent dostarczaną przez bibliotekę React
class Navi extends Component {
  //fundamentalna funkcja render z cyklu życia komponentu React
  render() {
    //funkcja ta zwraca komponent
    //z głównego widoku przekazywana jest tutaj informacja o animacji
    //animacja jest definiowana w pliku .sass
    let classes = "Navi " + this.props.animation;
    return (
      <div className={classes}>
        <div className="navi-outer"></div>
        <div className="navi-inner" onClick={this.props.metamorphosis}></div>
      </div>
    );
  }
}

export default Navi;
