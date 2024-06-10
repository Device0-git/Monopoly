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
  payback(money) {
    if (this.debt - money < 0) alert("Don't pay more than you owe!");
    else if (this.debt === 0) alert("Can't pay if you don't owe!");
    else {
      this.debt = this.debt - money;
      this.money = this.money - money;
      bank_money = bank_money + money;
      alert(`You now owe ${this.debt} to the bank`);
    }
  }
  payback_all() {
    this.money = this.money - this.debt;
    bank_money = bank_money + this.debt;
    this.debt = 0;
  }
}

// let get_number_of_players = () => {
//   let nop = Number(prompt("How many number of players are there?"));
//   if (nop) return nop;
//   else {
//     alert("Please Enter a valid Number!");
//     return get_number_of_players();
//   }
// };

// let create_players = (number_of_players) => {
//   let res = [];
//   for (let i = 1; i <= number_of_players; i++) {
//     alert("Enter details for Player " + i);
//     res.push(
//       new Player(
//         prompt("What is your name?"),
//         prompt("What is your color of choice?")
//       )
//     );
//   }
//   return res;
// };

// let nop = get_number_of_players();
// let players = create_players(nop);

//dummy players for debugging
let players = [
  {
    color: "Red",
    debt: 0,
    lost: false,
    money: 150000,
    name: "Nancy",
    owned_cards: [],
    payments_skipped: 0,
    position: 1,
    turn: false,
  },
  {
    color: "Orange",
    debt: 0,
    lost: false,
    money: 150000,
    name: "Bhai",
    owned_cards: [],
    payments_skipped: 0,
    position: 1,
    turn: false,
  },
  {
    color: "Yellow",
    debt: 0,
    lost: false,
    money: 150000,
    name: "Somnath",
    owned_cards: [],
    payments_skipped: 0,
    position: 1,
    turn: false,
  },
  {
    color: "Green",
    debt: 0,
    lost: false,
    money: 150000,
    name: "Rutwik",
    owned_cards: [],
    payments_skipped: 0,
    position: 1,
    turn: false,
  },
  {
    color: "Blue",
    debt: 0,
    lost: false,
    money: 150000,
    name: "Nandini",
    owned_cards: [],
    payments_skipped: 0,
    position: 1,
    turn: false,
  },
  {
    color: "Indigo",
    debt: 0,
    lost: false,
    money: 150000,
    name: "Shakti",
    owned_cards: [],
    payments_skipped: 0,
    position: 1,
    turn: false,
  },
  {
    color: "Violet",
    debt: 0,
    lost: false,
    money: 150000,
    name: "Shivam",
    owned_cards: [],
    payments_skipped: 0,
    position: 1,
    turn: true,
  },
];

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
//player 1 can start the game
players[0].turn = true;
//game goes on as dice is rolled
let i = 0;
function roll_dice() {
  if (i + 1 > players.length) {
    i = 0;
  }
  let player = players[i++];
  // let inc = Math.floor(Math.random() * 6) + 1;
  let inc = 1; //for debugging
  let newpos = player.position + inc;
  if (newpos > 36) {
    newpos = newpos - 36;
  }
  player.position = newpos;
  let targetEleLen = document.getElementById(player.position).children.length;
  let targetEle = document.getElementById(player.position).children[
    targetEleLen - 1
  ];
  let color = player.color.toLowerCase();
  let p = document.getElementById(color);
  targetEle.appendChild(p);
}

let button = document.getElementsByClassName("dice");
let bank_money = (150000 * nop) / 2;
