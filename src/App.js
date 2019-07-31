import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isStarted: false,
      first: {
        turn: false,
        left: 1,
        right: 1
      },
      second: {
        turn: false,
        left: 1,
        right: 1
      }
    };
  }

  componentWillMount() {
    setInterval(() => {
      setTimeout(() => {
        if (this.state.isStarted && this.state.second.turn) {
          console.log(1);
          const first = this.state.first;
          const second = this.state.second;
          if (second.right + first.right === 5) {
            first.right = second.right + first.right;
            this.setState({ first }, this.switchTurn);
          } else if (second.right + first.left === 5) {
            first.left = second.right + first.left;
            this.setState({ first }, this.switchTurn);
          } else if (second.left + first.right === 5) {
            first.right = second.left + first.right;
            this.setState({ first }, this.switchTurn);
          } else if (second.left + first.left === 5) {
            first.left = second.left + first.left;
            this.setState({ first }, this.switchTurn);
          } else if (second.left + second.right < 5) {
            // assign randomly
            second.right = second.right + second.left;
            this.setState({ first }, this.switchTurn);
          } else if (second.right + first.right < 5) {
            first.right = second.right + first.right;
            this.setState({ first }, this.switchTurn);
          } else if (second.right + first.left < 5) {
            first.left = second.right + first.left;
            this.setState({ first }, this.switchTurn);
          } else if (second.left + first.right < 5) {
            first.right = second.left + first.right;
            this.setState({ first }, this.switchTurn);
          } else if (second.left + first.left < 5) {
            first.left = second.left + first.left;
            this.setState({ first }, this.switchTurn);
          } else {
            const player = {
              turn: false,
              left: 1,
              right: 1
            };
            this.setState({ isStarted: false, first: player, second: player });
            alert("Game Over");
          }
        }
      }, 2000);
    }, 4000);
  }

  getStartTurn = () => {
    const value = Math.floor(Math.random() * Math.floor(2));
    if (value === 0) {
      const player = this.state.first;
      player.turn = true;
      this.setState({ first: player });
    } else {
      const player = this.state.second;
      player.turn = true;
      this.setState({ second: player });
    }
  };

  start = e => {
    e.preventDefault();
    this.getStartTurn();
    this.setState({ isStarted: true });
  };

  switchTurn = () => {
    const first = this.state.first;
    const second = this.state.second;
    if (first.left + first.right === 10) {
      const player = {
        turn: false,
        left: 1,
        right: 1
      };
      this.setState({ isStarted: false, first: player, second: player });
      alert("You Lost! Try Again.");
    } else if (second.left + second.right === 10) {
      const player = {
        turn: false,
        left: 1,
        right: 1
      };
      this.setState({ isStarted: false, first: player, second: player });
      alert("Congrats! You Won.");
    }
    if (first.turn) {
      second.turn = true;
      first.turn = false;
      this.setState({ first, second });
    } else if (second.turn) {
      second.turn = false;
      first.turn = true;
      this.setState({ first, second });
    }
  };

  toRight = () => {
    const player = this.state.first;
    let sum = player.left + player.right;
    if (sum <= 5) {
      player.right = sum;
      this.setState({ first: player }, this.switchTurn);
    }
  };

  toLeft = () => {
    const player = this.state.first;
    let sum = player.left + player.right;
    if (sum <= 5) {
      player.left = sum;
      this.setState({ first: player }, this.switchTurn);
    }
  };

  fromLeft = () => {
    const { first, second } = this.state;
    if (first.left + second.left === 5) {
      second.left = first.left + second.left;
      this.setState({ second }, this.switchTurn);
    } else if (first.left + second.right === 5) {
      second.right = first.left + second.right;
      this.setState({ second }, this.switchTurn);
    } else if (first.left + second.left < 5 && first.left + second.right < 5) {
      const right = window.confirm(`Want to chop Alexa's right Hand`);
      if (right) {
        second.right = first.left + second.right;
        this.setState({ second }, this.switchTurn);
      } else {
        second.left = first.left + second.left;
        this.setState({ second }, this.switchTurn);
      }
    } else if (first.left + second.left < 5) {
      second.left = first.left + second.left;
      this.setState({ second }, this.switchTurn);
    } else if (first.left + second.right < 5) {
      second.right = first.left + second.right;
      this.setState({ second }, this.switchTurn);
    } else {
      alert(`Sorry, You can't Chop from left hand`);
    }
  };

  fromRight = () => {
    const { first, second } = this.state;
    if (first.right + second.left === 5) {
      second.left = first.right + second.left;
      this.setState({ second }, this.switchTurn);
    } else if (first.right + second.right === 5) {
      second.right = first.right + second.right;
      this.setState({ second }, this.switchTurn);
    } else if (
      first.right + second.left < 5 &&
      first.right + second.right < 5
    ) {
      const right = window.confirm(`Want to chop Alexa's right Hand`);
      if (right) {
        second.right = first.right + second.right;
        this.setState({ second }, this.switchTurn);
      } else {
        second.left = first.right + second.left;
        this.setState({ second }, this.switchTurn);
      }
    } else if (first.right + second.left < 5) {
      second.left = first.right + second.left;
      this.setState({ second }, this.switchTurn);
    } else if (first.right + second.right < 5) {
      second.right = first.right + second.right;
      this.setState({ second }, this.switchTurn);
    } else {
      alert(`Sorry, You can't Chop from right hand`);
    }
  };

  render() {
    const { first, second, isStarted } = this.state;
    return (
      <div
        style={{
          display: "flex",
          background:
            "linear-gradient(45deg, rgb(30,87,153) 0%,rgb(41,137,216) 48%,rgb(125,185,232) 100%",
          height: window.innerHeight,
          width: window.innerWidth,
          flexDirection: "column"
        }}
      >
        <div
          style={{
            display: "flex",
            width: window.innerWidth,
            justifyContent: "space-evenly",
            alignItems: "center",
            height: 80,
            backgroundColor: "rgba(89, 89, 89, 0.1)"
          }}
        >
          <span
            style={{
              flex: 3,
              width: "100px",
              textAlign: "right",
              fontSize: "1.5em",
              color: "white"
            }}
          >
            Chop-Chop
          </span>
          <img
            src="chops.png"
            alt=""
            height="80%"
            width="50%"
            style={{ flex: 1, objectFit: "contain" }}
          />
        </div>
        <div
          style={{ flex: 1, display: "flex", width: "100%", height: "100%" }}
        >
          <div style={{ flex: 1 }}>
            <img
              height="100%"
              width="100%"
              style={{
                objectFit: "contain",
                opacity: second.right === 5 ? 0.5 : 1,
                transform: "rotate(180deg) scaleX(-1)"
              }}
              src={`${second.right}.png`}
              alt="img"
            />
          </div>
          <div style={{ flex: 1 }}>
            <img
              height="100%"
              width="100%"
              style={{
                objectFit: "contain",
                opacity: second.left === 5 ? 0.5 : 1,
                transform: "rotate(180deg)"
              }}
              src={`${second.left}.png`}
              alt="img"
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {isStarted ? (
            first.turn ? (
              "Your Turn"
            ) : second.turn ? (
              "Alexas Turn"
            ) : (
              "Wait"
            )
          ) : (
            <button onClick={this.start}>START!</button>
          )}
        </div>
        <div
          style={{ flex: 1, display: "flex", width: "100%", height: "100%" }}
        >
          <div style={{ flex: 1 }}>
            <img
              height="100%"
              width="100%"
              style={{
                objectFit: "contain",
                opacity: first.left === 5 ? 0.5 : 1
              }}
              src={`${first.left}.png`}
              alt="img"
            />
          </div>
          <div style={{ flex: 1 }}>
            <img
              height="100%"
              width="100%"
              style={{
                objectFit: "contain",
                opacity: first.right === 5 ? 0.5 : 1,
                transform: "scaleX(-1)"
              }}
              src={`${first.right}.png`}
              alt="img"
            />
          </div>
        </div>
        {isStarted && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center"
            }}
          >
            <button disabled={!first.turn} onClick={this.toRight}>
              To Right!
            </button>
            <button disabled={!first.turn} onClick={this.fromLeft}>
              To Alexas From Left!
            </button>
            <button disabled={!first.turn} onClick={this.fromRight}>
              To Alexas From Right!
            </button>
            <button disabled={!first.turn} onClick={this.toLeft}>
              To Left!
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
