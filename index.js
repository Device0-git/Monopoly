class CityCard {
  constructor(
    city,
    cost,
    rentForGuestHouse,
    rentForPrivateVilla,
    rentForHotel,
    owner
  ) {
    this.city = city;
    this.cost = cost;
    this.rentForGuestHouse = rentForGuestHouse;
    this.rentForPrivateVilla = rentForPrivateVilla;
    this.rentForHotel = rentForHotel;
    this.owner = owner;
  }
}

const all_cards = [
  new CityCard("Mumbai", 60000, 5000, 15000, 45000),
  new CityCard("Delhi", 58000, 4800, 14500, 43500),
  new CityCard("Chennai", 53000, 4200, 12600, 38500),
  new CityCard("Kolkata", 51000, 4000, 12000, 36000),
  new CityCard("Pune", 48000, 3600, 10800, 32500),
  new CityCard("Surat", 46000, 3400, 10200, 30500),
  new CityCard("Jaipur", 45000, 3300, 10000, 29500),
  new CityCard("Lucknow", 43000, 3100, 9400, 28500),
  new CityCard("Kanpur", 42000, 3000, 9000, 27000),
  new CityCard("Nagpur", 41000, 2900, 8700, 26000),
  new CityCard("Patna", 40000, 2800, 8400, 25000),
  new CityCard("Indore", 39000, 2700, 8100, 24000),
  new CityCard("Bhopal", 37000, 2500, 7500, 22000),
  new CityCard("Kochi", 35000, 2300, 6900, 20000),
  new CityCard("Goa", 31000, 1900, 5700, 16000),
  new CityCard("Nashik", 30000, 1800, 5400, 15000),
  new CityCard("Agra", 26000, 1400, 4200, 11000),
  new CityCard("Amritsar", 24000, 1200, 3600, 9000),
  new CityCard("Shimla", 23000, 1100, 3300, 8000),
  new CityCard("Margao", 22000, 1000, 3000, 7000),
  new CityCard("Water", 22000, 1000, 3000, 7000),
  new CityCard("Railway", 22000, 1000, 3000, 7000),
  new CityCard("Elec Co.", 22000, 1000, 3000, 7000),
  new CityCard("B.E.S.T.", 22000, 1000, 3000, 7000),
  new CityCard("Indigo", 22000, 1000, 3000, 7000),
  new CityCard("Boat", 22000, 1000, 3000, 7000),
];

class Player {
  money = 150000;
  owned_cards = [];
  debt = 0;
  payments_skipped = 0;
  lost = false;
  position = 1;
  turn = false;
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
  buy_card(card, money) {
    if (this.money - money < 0) {
      alert("You're poor, take loan from the bank or sell your belongings.");
    }
    this.money = this.money - money;
    this.owned_cards.push(card);
  }
  sell_card(card, money) {
    this.money = this.money + money;
    this.owned_cards.splice(this.owned_cards.findIndex(card), 1);
  }
  borrow_money(money) {
    this.debt = this.debt + money;
    this.money = this.money + money;
    bank_money = bank_money - money;
  }
  payback() {
    let money = prompt("How much money can you pay back?");
    if (this.debt - money < 0)
      alert(`You only owe ${this.debt} to the bank, Don't pay more!`);
    else if (this.debt === 0) alert("Can't pay if you don't owe!");
    else if (this.debt / money >= 2) {
      this.debt = this.debt - money;
      this.money = this.money - money;
      bank_money = bank_money + money;
      this.payments_skipped -= 3;
      alert(`You get 3 more days but still owe ${this.debt} to the bank`);
    } else {
      this.debt = this.debt - money;
      this.money = this.money - money;
      bank_money = bank_money + money;
      alert(`You now owe ${this.debt} to the bank`);
    }
  }
}

let get_number_of_players = () => {
  let nop = Number(prompt("How many number of players are there?"));
  if (nop) return nop;
  else {
    alert("Please Enter a valid Number!");
    return get_number_of_players();
  }
};

let create_players = (number_of_players) => {
  let res = [];
  for (let i = 1; i <= number_of_players; i++) {
    alert("Enter details for Player " + i);
    res.push(
      new Player(
        prompt("What is your name?"),
        prompt("What is your color of choice?")
      )
    );
  }
  return res;
};

let nop = get_number_of_players();
let players = create_players(nop);
// let nop = 7;

//dummy players for debugging
// let players = [
//   {
//     color: "Red",
//     debt: 0,
//     lost: false,
//     money: 150000,
//     name: "Nancy",
//     owned_cards: [],
//     payments_skipped: 0,
//     position: 1,
//     turn: false,
//   },
//   {
//     color: "Orange",
//     debt: 0,
//     lost: false,
//     money: 150000,
//     name: "Bhai",
//     owned_cards: [],
//     payments_skipped: 0,
//     position: 1,
//     turn: false,
//   },
//   {
//     color: "Yellow",
//     debt: 0,
//     lost: false,
//     money: 150000,
//     name: "Somnath",
//     owned_cards: [],
//     payments_skipped: 0,
//     position: 1,
//     turn: false,
//   },
//   {
//     color: "Green",
//     debt: 0,
//     lost: false,
//     money: 150000,
//     name: "Rutwik",
//     owned_cards: [],
//     payments_skipped: 0,
//     position: 1,
//     turn: false,
//   },
//   {
//     color: "Blue",
//     debt: 0,
//     lost: false,
//     money: 150000,
//     name: "Nandini",
//     owned_cards: [],
//     payments_skipped: 0,
//     position: 1,
//     turn: false,
//   },
//   {
//     color: "Indigo",
//     debt: 0,
//     lost: false,
//     money: 150000,
//     name: "Shakti",
//     owned_cards: [],
//     payments_skipped: 0,
//     position: 1,
//     turn: false,
//   },
//   {
//     color: "Violet",
//     debt: 0,
//     lost: false,
//     money: 150000,
//     name: "Shivam",
//     owned_cards: [],
//     payments_skipped: 0,
//     position: 1,
//     turn: false,
//   },
// ];

//Initiate players at start
players.forEach((player) => {
  let p = document.createElement("div");
  let color = player.color.toLowerCase();
  p.style.backgroundColor = color;
  p.classList.add("spaces", "player");
  p.id = color;
  let targetEleLen = document.getElementById(player.position).children.length;
  let targetEle = document.getElementById(player.position).children[
    targetEleLen - 1
  ];
  targetEle.appendChild(p);
});
//game goes on as dice is rolled
let i = 0;
let prev_index = i - 1;
function roll_dice() {
  if (i + 1 > players.length) {
    i = 0;
    prev_index = players.length - 1;
  }
  let player = players[i];
  prev_index = i - 1;
  if (prev_index < 0) {
    i = 0;
    prev_index = players.length - 1;
  }
  player.turn = true;
  player = players[prev_index];
  player.turn = false;
  player = players[i];
  i++;
  let inc = Math.floor(Math.random() * 6) + 1;
  // let inc = 1; //for debugging
  let newpos = player.position + inc;
  if (newpos > 36) {
    newpos = newpos - 36;
  }
  player.position = newpos;
  let current_card = document.getElementById(player.position);
  console.log(current_card.innerText);
  let targetEleLen = document.getElementById(player.position).children.length;
  let targetEle = document.getElementById(player.position).children[
    targetEleLen - 1
  ];
  let color = player.color.toLowerCase();
  let p = document.getElementById(color);
  targetEle.appendChild(p);
  function card_is_available(text) {
    let res;
    for (let i = 0; i < all_cards.length; i++) {
      let card = all_cards[i];
      if (card.city == text) {
        res = card;
        break;
      }
    }
    return res;
  }
  let cia = card_is_available(current_card.innerText);
  if (player.turn == true && cia) {
    let card_cost = cia.cost;
    //have an option to buy ticket only if it is players turn
    //player can only buy ticket on his/her own turn
    // player.buy_card(cia, card_cost);
  }
}

let button = document.getElementsByClassName("dice");
let bank_money = (150000 * nop) / 2;

document.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) roll_dice();
});
