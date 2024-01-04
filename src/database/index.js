const User = require('../database/models/user.model');
const Currency = require('../database/models/currency.model');
const Expense = require('../database/models/expense.model');
const Photo = require('../database/models/photo.model');
const Notification = require('../database/models/notification.model');
const Group = require('../database/models/group.model');
require('dotenv').config();
const dbUser = encodeURIComponent(process.env.DB_USER);
const dbPass = encodeURIComponent(process.env.DB_PASS);
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

const mongoose = require('mongoose');

const currencies = [
    { name: "Euro", symbol: "EUR", exchangeRate: 1.0 },
    { name: "US Dollar", symbol: "USD", exchangeRate: 1.2 },
    { name: "British Pound", symbol: "GBP", exchangeRate: 0.9 }
  ];

  const expenses = [
    {
      groupId: "658e0f3893c28db7b7d88af3",
      paidBy: "658e0028e4c9d9814af58529",
      amount: 100,
      description: "Dinner",
      createdAt: new Date(),
      splitAmong: ["658e1240ae17d6f8efc5d293", "658e0028e4c9d9814af5852a"]
    },
    {
        groupId: "658e1240ae17d6f8efc5d293",
        paidBy: "658e0028e4c9d9814af58529",
        amount: 200,
        description: "Park ",
        createdAt: new Date(),
        splitAmong: ["658e0f3893c28db7b7d88af3", "658e0028e4c9d9814af5852a"]
      }
    // Ajoutez plus d'objets Expense ici
  ];

  const groups = [
    {
      name: "Family Trip",
      description: "Trip to the mountains",
      members: ["658e0028e4c9d9814af58529", "658e0028e4c9d9814af5852a"],
      createdBy: "658e0028e4c9d9814af58529"
    }
    // Ajoutez plus d'objets Group ici
  ];

  const notifications = [
    {
      userId: "658e0028e4c9d9814af58529",
      message: "You have a new expense to approve",
      isRead: false,
      createdAt: new Date()
    }
    // Ajoutez plus d'objets Notification ici
  ];

  const photos = [
    {
      url: "http://example.com/photo1.jpg",
      uploadedBy: "658e0028e4c9d9814af58529",
      groupId: "658e0f3893c28db7b7d88af3",
      createdAt: new Date()
    }
    // Ajoutez plus d'objets Photo ici
  ];

  const users = [
    {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      fullName: "John Doe",
      profilePhoto: "http://example.com/john.jpg"
    },
    {
      name: "Jane Doe",
      email: "jane@example.com",
      password: "password123",
      fullName: "Jane Doe",
      profilePhoto: "http://example.com/jane.jpg"
    },
    {
        name: "Mhcn test",
        email: "test@example.com",
        password: "password123",
        fullName: "Test Mhcn",
        profilePhoto: "http://example.com/jane.jpg"
      },
    // Ajoutez plus d'objets User ici
  ];
  

mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbName}?retryWrites=true&w=majority`)
    .then(() => {
        console.log("MongoDB Connected...");
      // User.insertMany(users);
        //  Group.insertMany(groups);
        //  Notification.insertMany(notifications);
        // Photo.insertMany(photos)
        //  Currency.insertMany(currencies);
        //  Expense.insertMany(expenses)

    }).catch((e) => {
        console.error("Connection error:", e);
    });
