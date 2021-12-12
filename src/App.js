import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      word: '',
      translate: '',
      cards: [],
    };
  }

  updateInput(key, value) {
    this.setState({
      [key]: value,
    });
  }

  addCard() {
    const newCard = {
      id: 1 + this.state.id,
      value: {
        word: this.state.word.slice(),
        translate: this.state.translate.slice(),
        overturned: false,
      },
    };
    this.setState({
      id: newCard.id,
      word: '',
      translate: '',
      cards: [...this.state.cards, newCard],
    });
  }

  turnCard(id) {
    const cards = [...this.state.cards];
    let index = cards.findIndex((card) => {
      return card.id === id;
    });
    cards[index].value.overturned = !cards[index].value.overturned;
    this.updateInput('cards', cards);
  }

  render() {
    return (
      <div className='App'>
        <h1 className='app-title'>Améliorez votre québecois</h1>
        <div className='container'>
          Add card and translation
          <br />
          <input
            type='text'
            placeholder='Enter word'
            value={this.state.word}
            onChange={(e) => this.updateInput('word', e.target.value)}
          ></input>
          <input
            type='text'
            placeholder='Enter word'
            value={this.state.translate}
            onChange={(e) => this.updateInput('translate', e.target.value)}
          ></input>
          <button className='btn add-btn' onClick={() => this.addCard()}>
            Add
          </button>
          <div>
            {this.state.cards.map((card) => {
              return (
                <div
                  key={card.id}
                  className={
                    'card' + (card.value.overturned ? ' overturned' : '')
                  }
                  onClick={() => this.turnCard(card.id)}
                >
                  {card.value.overturned
                    ? card.value.translate
                    : card.value.word}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
