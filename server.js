// To connect with your mongoDB database
require("dotenv").config();
// console.log(process.env);
const mongoose_resources_page = require("mongoose");
const mongoose = require('mongoose');
mongoose.createConnection(process.env.MONGODB_URI);
let db_name = "Test2";
mongoose_resources_page.createConnection(process.env.MONGODB_URI_RESOURCES + db_name)

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

// Schema for Resources-page
const ResourcesSchema = new mongoose_resources_page.Schema({
	title: {
		type: String,
	},
	desc: {
		type: String,
	},
	link: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model('users', UserSchema);
const ResourcesModel = mongoose_resources_page.model('user', ResourcesSchema);
// User.createIndexes();

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

	resp.send("App is Working");

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

app.post("/registerResource", async (req, resp) => {
	try {
		const userResources = new ResourcesModel(req.body);
		let resultResources = await userResources.save();
		resultResources = resultResources.toObject();

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});

app.get("/api", (req, res) => {
	User.find({}).then((data) => {
		res.send(data)
		return data;
	})
})

app.get("/apiResources", (req, res) => {
	userResources.find({}).then((data) => {
		res.send(data)
		return data;
	})
})

app.post("/delete", async (req, res) => {
	console.log(req.body)
	const uniqueID = req.body.uniqueID;

    User.deleteOne({ _id:  uniqueID}).then((e) => {console.log(e)});

})

app.post("/deleteResources", async (req, res) => {
	console.log(req.body)
	const uniqueResourceID = req.body.uniqueID;

    userResources.deleteOne({ _id:  uniqueResourceID}).then((e) => {console.log(e)});

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
