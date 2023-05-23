// To connect with your mongoDB database
require("dotenv").config();
// console.log(process.env);
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const port = process.env.port || 5000;

// Schema for users of app
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
		unique: true,
	},
	image: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now,
	},
});
const User = mongoose.model('users', UserSchema);
User.createIndexes();

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

	resp.send("App is Working");
	// You can check backend is working or not by
	// entering http://loacalhost:5000
	
	// If you see App is working means
	// backend working properly
});

app.post("/register", async (req, resp) => {
	try {
		const user = new User(req.body);
		let result = await user.save();
		result = result.toObject();
		if (result) {
			delete result.password;
			resp.send(req.body);
			console.log(result);
		} else {
			console.log("User already register");
		}

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});

app.get("/api", (req, res) => {
	User.find({}).then((data) => {
		res.send(data)
		return data;
	})

	// let myData = {"name": "Archit", "age": "19"}

})

app.post("/delete", async (req, res) => {
	console.log(req.body)
	const uniqueID = req.body.uniqueID;

    User.deleteOne({ _id:  uniqueID}).then((e) => {console.log(e)});
    await res.redirect("http://localhost:3000")
})

// app.post("/update", (req, res) => {

//     const checkbox2Id = req.body.checkbox2;
//     console.log(checkbox2Id);

//     const toDolist = User.find({_id: checkbox2Id}).then((member => {
//         console.log("This is the member" + member)
//         res.render("update", { itemsObj: member });
//     }));

    
//     // listModel.updateOne({_id: checkbox2Id}).then()
// })


app.listen(port, () => {
	console.log("Listening on the PORT for requests...")
})











// !-------------------------------------------------------------------------------------------------------------------------------------------

// const { ObjectId } = require('mongodb');
// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://archit:test123@startingcluster.wefgydk.mongodb.net/ReactTest', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(PORT, () => {
//       console.log(`Server listening on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });

// // Define your API routes and logic here
// app.get('/api/data', (req, res) => {
//   // Retrieve data from MongoDB using Mongoose
//   MyModel.find({})
//     .then((data) => {
//       res.json(data); // Send the data back as a JSON response
//     })
//     .catch((error) => {
//       console.error('Error retrieving data from MongoDB:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     });
// });

// // Define your Mongoose model
// const MyModel = mongoose.model('MyModel', new mongoose.Schema({
//   // Define your schema here
//   name: String,
//   // other properties...
// }));

