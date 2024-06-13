class CityCard {
  constructor(
    city,
    cost,
    rent_for_guest_house,
    rent_for_private_villa,
    rent_for_hotel,
    owner,
    is_special_card,
    is_super_special_card
  ) {
    this.city = city;
    this.cost = cost;
    this.rent_for_guest_house = rent_for_guest_house;
    this.rent_for_private_villa = rent_for_private_villa;
    this.rent_for_hotel = rent_for_hotel;
    this.owner = owner;
    this.is_special_card = is_special_card;
    this.is_super_special_card = is_super_special_card;
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
  //SPECIAL CARDS - Turn is lost and automatic transaction happens
  new CityCard("Jail", 200, undefined, undefined, undefined, undefined, true),
  new CityCard("Club", -100, undefined, undefined, undefined, undefined, true),
  new CityCard(
    "Resthouse",
    0,
    undefined,
    undefined,
    undefined,
    undefined,
    true
  ),
  new CityCard(
    "Start",
    -10000,
    undefined,
    undefined,
    undefined,
    undefined,
    true
  ),
  //SUPER SPECIAL CARDS - dice roll determines cost to player
  new CityCard(
    "Tax" /* All tax goes to the bank */,
    [
      "10C" /* Income Tax: 10% of starting cash to simulate regular earnings taxation. */,
      "5P" /* Property Tax: 5% of total property value to simulate real estate taxation. */,
      10000 /* Luxury Tax: A flat rate applied to players for owning high-value assets, ensuring wealthier players contribute more. */,
      5000 /* Service Tax: A flat rate to simulate the cost of public services and utilities. */,
      "2A" /* Wealth Tax: 2% of total assets (cash + property value) to ensure a fair contribution from players with significant wealth. */,
      7500 /* Emergency Tax: A flat rate for special circumstances such as unforeseen events, ensuring players have to strategize for unexpected costs. */,
    ],
    undefined,
    undefined,
    undefined,
    undefined,
    true,
    true
  ),
  new CityCard(
    "Chance",
    [
      -2000 /* Received a bonus for good performance. */,
      3000 /* Fine for violating traffic rules. */,
      -5000 /* Inheritance from a distant relative. */,
      1500 /* Medical expenses. */, -1000 /* Won a small lottery prize. */,
      2000 /* Car repair costs. */,
    ],
    undefined,
    undefined,
    undefined,
    undefined,
    true,
    true
  ),
  new CityCard(
    "Service",
    [
      1000 /* Paid for a cleaning service. */,
      1500 /* Internet subscription fee. */, 2000 /* Car wash service fee. */,
      2500 /* Landscaping service payment. */,
      3000 /* House maintenance service fee. */,
      3500 /* Security service payment. */,
    ],
    undefined,
    undefined,
    undefined,
    undefined,
    true,
    true
  ),
];

class Player {
  money = 150000;
  owned_cards = [];
  property_value = this.owned_cards.reduce((acc, card) => {
    acc += card.cost;
  }, 0);
  debt = 0;
  payments_skipped = 0;
  lost = false;
  position = 1;
  turn = false;
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
  pay_rent(card, owner) {
    this.money = this.money - card.rent_for_guest_house;
    owner.money = owner.money + card.rent_for_guest_house;
  }
  buy_card(card) {
    if (card.owner === undefined) {
      let money = card.cost;
      if (this.money - money < 0) {
        alert("You're poor, take loan from the bank or sell your belongings.");
      }
      this.money = this.money - money;
      this.owned_cards.push(card);
      card.owner = this.name;
    } else {
      alert(
        card.owner + " owns the card, you can buy it when they want to sell it!"
      );
    }
  }
  sell_card() {
    let player = prompt("Who do you want to sell to?");
    let card = prompt("What card do you want to sell?");
    let money = prompt("How much money do they pay?");
    this.money = this.money + money;
    player.owned_cards = this.owned_cards.splice(
      this.owned_cards.findIndex(card),
      1
    );
  }
  borrow_money() {
    if (this.debt > bank_money / nop) {
      alert("You're at your borrow limit!");
      return;
    }
    let money = prompt("How much money do you need?");
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

// let nop = get_number_of_players();
// let players = create_players(nop);

//dummy players for debugging
let nop = 7;
let players = [
  new Player("Nancy", "Red"),
  new Player("Bhai", "Orange"),
  new Player("Somnath", "Yellow"),
  new Player("Rutwik", "Green"),
  new Player("Nandini", "Blue"),
  new Player("Shakti", "Indigo"),
  new Player("Shivam", "Violet"),
];

//Initiate players at start
players.forEach((player) => {
  let p = document.createElement("div");
  let color = player.color.toLowerCase();
  p.style.backgroundColor = color;
  //add appropriate classes for players
  p.classList.add("spaces", "player");
  p.id = color;
  //init player at start
  let target_element_length = document.getElementById(player.position).children
    .length;
  let target_element = document.getElementById(player.position).children[
    target_element_length - 1
  ];
  target_element.appendChild(p);
});
//game goes on as dice is rolled
let i = 0;
let prev_index = i - 1;
function roll_dice() {
  // keeping player turns in bounds
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
  //stopping previous players turn and starting turn for next player
  player.turn = true;
  player = players[prev_index];
  player.turn = false;
  player = players[i];
  i++;
  //dice rolls
  let dice_roll = Math.floor(Math.random() * 6) + 1;
  // let dice_roll = 1; //for debugging
  let new_position = player.position + dice_roll;
  //player comes full circle on board
  if (new_position > 36) {
    new_position = new_position - 36;
  }
  player.position = new_position;
  let current_card = document.getElementById(player.position);
  let current_card_text = current_card.innerText;
  //getting inner container of spaces the cards occupy
  let target_element_length = document.getElementById(player.position).children
    .length;
  let target_element = document.getElementById(player.position).children[
    target_element_length - 1
  ];
  let color = player.color.toLowerCase();
  let p = document.getElementById(color);
  target_element.appendChild(p);
  //getting the card name
  if ([1, 10, 19, 28].includes(player.position)) {
    document.getElementsByClassName("payback")[0].style.display = "none";
    document.getElementsByClassName("sell")[0].style.display = "none";
    document.getElementsByClassName("buy")[0].style.display = "none";
    if (player.position == 1) {
      player.money = player.money + 10000;
      //play mosh mosh video
    } else if (player.position == 10) {
      player.money = player.money - 200;
      //play za warudo video
    } else if (player.position == 19) {
      player.money = player.money + 100;
      //play tomodachi dayo video
    } else if (player.position == 28) {
      //play phonk video
    }
    return;
  }
  //getting card for current player
  function get_card(text) {
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
  //getting player for current card
  function get_player(owner_name) {
    let res;
    for (let i = 0; i < players.length; i++) {
      let player = players[i];
      if (player.name == owner_name) {
        res = player;
        break;
      }
    }
    return res;
  }
  //getting the card name current player is on
  let card = get_card(current_card_text);
  if (player.turn == true && card) {
    //have an option to buy ticket only if it is players turn
    //player can only buy ticket on his/her own turn
    //if player lands on special_card cards, his turn is skipped
    //he has no other option but to do the task he's supposed to
    // player.buy_card(card, card_cost);
    if (player.debt > 0) {
      document.getElementsByClassName("payback")[0].style.display = "block";
    }
    if (player.owned_cards.length > 0) {
      document.getElementsByClassName("sell")[0].style.display = "block";
    }
    if (player.money <= 75000) {
      document.getElementsByClassName("borrow")[0].style.display = "block";
    }
    if (card.is_super_special_card) {
      document.getElementsByClassName("payback")[0].style.display = "none";
      document.getElementsByClassName("sell")[0].style.display = "none";
      document.getElementsByClassName("buy")[0].style.display = "none";
      let roll = card.cost[dice_roll - 1];
      if (typeof roll == "string") {
        //C - cash, P - property, A - both
        if (roll.endsWith("C")) {
          player.money =
            player.money - (player.money * Number(roll.slice(0, -1))) / 100;
        } else if (roll.endsWith("P")) {
          player.money =
            player.money -
            (player.property_value * Number(roll.slice(0, -1))) / 100;
        } else if (roll.endsWith("A")) {
          player.money =
            player.money -
            ((player.money + player.property_value) *
              Number(roll.slice(0, -1))) /
              100;
        }
      } else {
        player.money = player.money - roll;
      }
      return;
    } else if (card.owner === undefined) {
      let buy_button = document.getElementsByClassName("buy")[0];
      buy_button.style.display = "block";
      buy_button.addEventListener("click", () => {
        player.buy_card(get_card(current_card_text));
      });
    } else {
      let owned_card = get_card(current_card_text);
      let owned_by_player = get_player(owned_card.owner);
      player.pay_rent(owned_card, owned_by_player);
    }
  }
}

let button = document.getElementsByClassName("dice");
let bank_money = (150000 * nop) / 2;

document.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    roll_dice();
  }
});
// prevent page reload
// window.addEventListener("beforeunload", function (event) {
//   event.preventDefault();
// });
