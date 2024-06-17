/* Tasks - 
      1. fix the fact that after a player goes onto many blocks and then
      buys 1, a toast is roased by his name that he bought all the cards that
      he previously visited
      2. fix toast by adding more things to buy, sell, rent methods in Player
      to support raising a toast without a problem
*/

class CityCard {
  constructor(
    city,
    cost,
    rent,
    order,
    owner,
    is_special_card,
    is_super_special_card
  ) {
    this.city = city;
    this.cost = cost;
    this.rent = rent;
    this.order = order;
    this.owner = owner;
    this.is_special_card = is_special_card;
    this.is_super_special_card = is_super_special_card;
  }
}

const all_cards = [
  new CityCard("Mumbai", 60000, [5000, 15000, 45000], 0),
  new CityCard("Delhi", 58000, [4800, 14500, 43500], 0),
  new CityCard("Chennai", 53000, [4200, 12600, 38500], 0),
  new CityCard("Kolkata", 51000, [4000, 12000, 36000], 0),
  new CityCard("Pune", 48000, [3600, 10800, 32500], 0),
  new CityCard("Surat", 46000, [3400, 10200, 30500], 0),
  new CityCard("Jaipur", 45000, [3300, 10000, 29500], 0),
  new CityCard("Lucknow", 43000, [3100, 9400, 28500], 0),
  new CityCard("Kanpur", 42000, [3000, 9000, 27000], 0),
  new CityCard("Nagpur", 41000, [2900, 8700, 26000], 0),
  new CityCard("Patna", 40000, [2800, 8400, 25000], 0),
  new CityCard("Indore", 39000, [2700, 8100, 24000], 0),
  new CityCard("Bhopal", 37000, [2500, 7500, 22000], 0),
  new CityCard("Kochi", 35000, [2300, 6900, 20000], 0),
  new CityCard("Goa", 31000, [1900, 5700, 16000], 0),
  new CityCard("Nashik", 30000, [1800, 5400, 15000], 0),
  new CityCard("Agra", 26000, [1400, 4200, 11000], 0),
  new CityCard("Amritsar", 24000, [1200, 3600, 9000], 0),
  new CityCard("Shimla", 23000, [1100, 3300, 8000], 0),
  new CityCard("Margao", 22000, [1000, 3000, 7000], 0),
  new CityCard("Water", 22000, [1000, 3000, 7000], 0),
  new CityCard("Railway", 22000, [1000, 3000, 7000], 0),
  new CityCard("Elec Co.", 22000, [1000, 3000, 7000], 0),
  new CityCard("B.E.S.T.", 22000, [1000, 3000, 7000], 0),
  new CityCard("Indigo", 22000, [1000, 3000, 7000], 0),
  new CityCard("Boat", 22000, [1000, 3000, 7000], 0),
  //SPECIAL CARDS - Turn is lost and automatic transaction happens
  new CityCard("Jail", 200, undefined, undefined, undefined, true),
  new CityCard("Club", -100, undefined, undefined, undefined, true),
  new CityCard("Resthouse", 0, undefined, undefined, undefined, true),
  new CityCard("Start", -10000, undefined, undefined, undefined, true),
  //SUPER SPECIAL CARDS - dice roll determines cost to player
  new CityCard(
    "Tax" /* All tax goes to the bank */,
    [
      ["10C", "Income Tax: 10%"],
      ["5P", "Property Tax: 5%"],
      [10000, "Luxury Tax"],
      [5000, "Service Tax"],
      ["2A", "Wealth Tax: 2%"],
      [7500, "Emergency Tax"],
    ],
    undefined,
    undefined,
    undefined,
    true,
    true
  ),
  new CityCard(
    "Chance",
    [
      [-2000, "Received a bonus for good performance."],
      [3000, "Fine for violating traffic rules."],
      [-5000, "Inheritance from a distant relative."],
      [1500, "Medical expenses."],
      [-1000, "Won a small lottery prize."],
      [2000, "Car repair costs."],
    ],
    undefined,
    undefined,
    undefined,
    true,
    true
  ),
  new CityCard(
    "Service",
    [
      [1000, "Paid for a cleaning service."],
      [1500, "Internet subscription fee."],
      [2000, "Car wash service fee."],
      [2500, "Landscaping service payment."],
      [3000, "House maintenance service fee."],
      [3500, "Security service payment."],
    ],
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
  pay_rent(current_card_text) {
    let owned_card = get_card(current_card_text);
    let owned_by_player = get_player(owned_card.owner);
    this.money = this.money - owned_card.rent[owned_card.order];
    owned_by_player.money =
      owned_by_player.money + owned_card.rent[owned_card.order];
    raise_a_toast(
      this.name +
        " paid " +
        owned_card.rent[owned_card.order] +
        " to " +
        owned_by_player.name +
        " for " +
        current_card_text,
      this.color,
      "rent"
    );
  }
  buy_card(card, current_card_text) {
    if (card.owner === undefined) {
      let money = card.cost;
      if (this.money - money < 0) {
        alert("You're poor, take loan from the bank or sell your belongings.");
        return;
      }
      this.money = this.money - money;
      this.owned_cards.push(card);
      card.owner = this.name;
      raise_a_toast(
        this.name + " bought " + current_card_text + " for " + money,
        this.color,
        "buy"
      );
    } else if (this.name === card.owner) {
      let money = card.cost;
      if (this.money - money < 0) {
        alert("You're poor, take loan from the bank or sell your belongings.");
        return;
      }
      this.money = this.money - money;
      this.owned_cards.push(card);
      card.owner = this.name;
      card.order = card.order + 1;
      raise_a_toast(
        this.name +
          " upgraded " +
          current_card_text +
          " into " +
          order[card.order] +
          " for " +
          money,
        this.color,
        "upgrade"
      );
    } else if (card.owner) {
      alert(card.owner + " owns the card, buy it when they want to sell it!");
    }
  }
  sell_card() {
    let other_player_name = prompt("Who do you want to sell to?");
    let other_player = get_player(other_player_name);
    let card_name = prompt("What card do you want to sell?");
    let card = get_card(card_name);
    let money = prompt("How much money do they pay?");
    let deal = confirm("Deal?");
    if (deal && other_player && this.owned_cards.includes(card)) {
      this.money += money;
      other_player.owned_cards = this.owned_cards.splice(
        this.owned_cards.findIndex((curr, index) => {
          if (curr === card) return index;
        }),
        1
      );
      other_player.money -= money;
      raise_a_toast(
        this.name +
          " sold " +
          card_name +
          " to " +
          other_player_name +
          " for " +
          money,
        this.color,
        "sell"
      );
    } else if (!other_player) {
      alert("Player you want to sell to doesn't exist!");
    } else if (!deal) {
    } else {
      alert("You don't own " + card_name);
    }
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
let order = { 0: "guest house", 1: "private villa", 2: "hotel" };
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
  let old_position = player.position;
  //player comes full circle on board
  if (new_position > 36) {
    new_position = new_position - 36;
  }
  player.position = new_position;
  let current_card = document.getElementById(new_position);
  let prev_card = document.getElementById(old_position);
  const corners = { 1: "Start", 10: "Jail", 19: "Club", 28: "Restroom" };
  let current_card_text = current_card.innerText;
  let prev_card_text = prev_card.innerText;
  if (corners[old_position]) {
    prev_card_text = corners[old_position];
  } else if (corners[new_position]) {
    current_card_text = corners[new_position];
  }
  //getting inner container of spaces the cards occupy
  let target_element_length = document.getElementById(player.position).children
    .length;
  let target_element = document.getElementById(player.position).children[
    target_element_length - 1
  ];
  let color = player.color.toLowerCase();
  let p = document.getElementById(color);
  target_element.appendChild(p);
  raise_a_toast(
    player.name +
      " rolled a " +
      dice_roll +
      " and went from " +
      prev_card_text +
      " to " +
      current_card_text,
    player.color,
    "roll"
  );
  //getting the card name
  if ([1, 10, 19, 28].includes(player.position)) {
    upgrade_button.style.display = "none";
    payback_button.style.display = "none";
    sell_button.style.display = "none";
    buy_button.style.display = "none";
    let amount;
    if (player.position == 1) {
      amount = 10000;
      player.money = player.money + amount;
      raise_a_toast(
        player.name + " was rewarded for a new start with ₹" + amount,
        player.color,
        "start"
      );
      //play mosh mosh video
    } else if (player.position == 10) {
      amount = 200;
      player.money = player.money - amount;
      raise_a_toast(
        player.name + " bribed the jailer with ₹" + amount,
        player.color,
        "jail"
      );
      //play za warudo video
    } else if (player.position == 19) {
      amount = 100;
      player.money = player.money + amount;
      raise_a_toast(
        player.name + ' "found" ₹' + amount + " at the club",
        player.color,
        "club"
      );
      //play tomodachi dayo video
    } else if (player.position == 28) {
      raise_a_toast(player.name + " rested", player.color, "rest");
      //play phonk video
    }
    return [player, current_card_text];
  }
  //getting the card name current player is on
  let card = get_card(current_card_text);
  if (player.turn == true && card) {
    if (player.debt > 0) {
      payback_button.style.display = "block";
    } else {
      payback_button.style.display = "none";
    }
    if (player.owned_cards.length > 0) {
      sell_button.style.display = "block";
    } else {
      sell_button.style.display = "none";
    }
    if (player.money <= 75000) {
      borrow_button.style.display = "block";
    } else {
      borrow_button.style.display = "none";
    }
    if (card.is_super_special_card) {
      let roll = card.cost[dice_roll - 1][0];
      let message = card.cost[dice_roll - 1][1];
      if (typeof roll == "string") {
        raise_a_toast(player.name + " paid " + message, player.color, "tax");
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
        raise_a_toast(
          message + " of " + roll + " paid by " + player.name,
          player.color,
          "tax"
        );
      }
      return [player, current_card_text];
    } else if (player.turn && card.owner === undefined) {
      buy_button.style.display = "block";
      return [player, current_card_text];
    } else if (player.turn && card.owner === player.name) {
      upgrade_button.style.display = "block";
      return [player, current_card_text];
    } else {
      buy_button.style.display = "none";
      player.pay_rent(current_card_text);
    }
  }
}

let dice_button = document.getElementsByClassName("dice")[0];
let bank_money = (150000 * nop) / 2;
//getting return value from dice roll
let res;
//interactable buttons
var buy_button = document.getElementsByClassName("buy")[0];
var sell_button = document.getElementsByClassName("sell")[0];
var borrow_button = document.getElementsByClassName("borrow")[0];
var payback_button = document.getElementsByClassName("payback")[0];
var upgrade_button = document.getElementsByClassName("upgrade")[0];
//button interactions
buy_button.addEventListener("click", () => {
  let [player, current_card_text] = res;
  if (player.turn) {
    player.buy_card(get_card(current_card_text), current_card_text);
  }
});
upgrade_button.addEventListener("click", () => {
  let [player, current_card_text] = res;
  if (player.turn) {
    player.buy_card(get_card(current_card_text), current_card_text);
  }
});
sell_button.addEventListener("click", () => {
  let [player] = res;
  if (player.turn) {
    player.sell_card();
  }
});
borrow_button.addEventListener("click", () => {
  //implement borrow logic
});
payback_button.addEventListener("click", () => {
  //implement payback logic
});
//rolling dice on dice click
dice_button.addEventListener("click", () => {
  res = roll_dice();
});
//rolling dice on ENTER
document.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    res = roll_dice();
  }
});
// prevent page reload
// window.addEventListener("beforeunload", function (event) {
//   event.preventDefault();
//   event.returnValue = "";
// });
//adding bread to toast
function raise_a_toast(message, color, thing) {
  const toast = document.getElementsByClassName("toast")[0];
  const temp = document.createElement("div");
  const type = document.createElement("div");
  const bread = document.createElement("div");
  temp.classList.add("temp");
  type.classList.add("type", thing);
  bread.classList.add("bread");
  bread.style.backgroundColor = color;
  bread.textContent = message;
  toast.appendChild(temp);
  temp.appendChild(type);
  temp.appendChild(bread);
  toast.scrollBy(0, -99999);
}

//getting card for current player
function get_card(text) {
  let res;
  for (let i = 0; i < all_cards.length; i++) {
    let card = all_cards[i];
    if (card.city.toLowerCase() == text.toLowerCase()) {
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
    if (player.name.toLowerCase() == owner_name.toLowerCase()) {
      res = player;
      break;
    }
  }
  return res;
}
