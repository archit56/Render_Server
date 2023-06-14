// To connect with your mongoDB database
require("dotenv").config();
// console.log(process.env);

const mongoose = require('mongoose');

const db1 = mongoose.createConnection(process.env.MONGODB_URI);
let db_name = "Test2";
const dbResources = mongoose.createConnection(process.env.MONGODB_URI_RESOURCES + db_name)
const dbAnnouncements = mongoose.createConnection(process.env.MONGODB_URI_ANNOUNCEMENTS + "Announcements")
const dbAdmissions = mongoose.createConnection(process.env.MONGODB_URI_ADMISSIONS + "Admissions")
const dbAbout = mongoose.createConnection(`${process.env.MONGODB_URI_ABOUT}About`)

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
const ResourcesSchema = new mongoose.Schema({
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

// Schema for Admissions-page
const AdmissionSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	desc1: {
		type: String,
	},
	link1: {
		type: String
	},
	link2: {
		type: String
	},
	link3: {
		type: String
	},
	link4: {
		type: String
	},
	desc2: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

// Schema for Announcements-page
const AnnouncementSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	desc1: {
		type: String,
	},
	link1: {
		type: String
	},
	desc2: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

// Schema for About-page
const AboutSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	img: {
		type: String,
	},
	desig: {
		type: String
	},
	email: {
		type: String
	},
	phone : {
		type: String
	},
	resumeLink : {
		type: String
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const User = db1.model('users', UserSchema);
const ResourcesModel = dbResources.model('user', ResourcesSchema);
const AdmissionsModel = dbAdmissions.model("admission", AdmissionSchema);
const AnnouncementsModel = dbAnnouncements.model("announcement", AdmissionSchema);
const AboutModel = dbAbout.model("about", AboutSchema);
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
	console.log(req.body);
	try {
		const userResources = new ResourcesModel(req.body);
		let resultResources = await userResources.save();
		resultResources = resultResources.toObject();

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});

app.post("/registerAdmission", async (req, resp) => {
	console.log(req.body);
	try {
		const userAdmissions = new AdmissionsModel(req.body);
		let resultAdmissions = await userAdmissions.save();
		resultAdmissions = resultAdmissions.toObject();

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});

app.post("/registerAnnouncements", async (req, resp) => {
	console.log(req.body);
	try {
		const userAnnouncements = new AnnouncementsModel(req.body);
		let resultAnnouncements = await userAnnouncements.save();
		resultAnnouncements = resultAnnouncements.toObject();

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});

app.post("/registerAbout", async (req, resp) => {
	console.log(req.body);
	try {
		const userAbouts = new AboutModel(req.body);
		let resultAbouts = await userAbouts.save();
		resultAbouts = resultAbouts.toObject();

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
	ResourcesModel.find({}).then((data) => {
		res.send(data)
		return data;
	})
})

app.get("/apiAdmissions", (req, res) => {
	AdmissionsModel.find({}).then((data) => {
		res.send(data)
		return data;
	})
})

app.get("/apiAnnouncements", (req, res) => {
	AnnouncementsModel.find({}).then((data) => {
		res.send(data)
		return data;
	})
})

app.get("/apiAbouts", (req, res) => {
	AboutModel.find({}).then((data) => {
		res.send(data)
		return data;
	})
})

app.post("/delete", async (req, res) => {
	console.log(req.body)
	const uniqueID = req.body.uniqueID;

    User.deleteOne({ _id:  uniqueID}).then((e) => {console.log(e)});

})

// resource page
app.post("/deleteResources", async (req, res) => {
	console.log(req.body)
	const uniqueResourcesId = req.body.key;

	console.log("the _id is: " + uniqueResourcesId);
   ResourcesModel.deleteOne({ _id: uniqueResourcesId}).then((e) => {console.log(e)});
})

// Admissions page
app.post("/deleteAdmissions", async (req, res) => {
	console.log(req.body)
	const uniqueAdmissionsId = req.body.key;

	console.log("the _id is: " + uniqueAdmissionsId);
    AdmissionsModel.deleteOne({ _id: uniqueAdmissionsId}).then((e) => {console.log(e)});
})

// Announcements page
app.post("/deleteAnnouncements", async (req, res) => {
	console.log(req.body)
	const uniqueAnnouncementsId = req.body.key;

	console.log("the _id is: " + uniqueAnnouncementsId);
    AnnouncementsModel.deleteOne({ _id: uniqueAnnouncementsId}).then((e) => {console.log(e)});
})

// Abouts page
app.post("/deleteAbouts", async (req, res) => {
	console.log(req.body)
	const uniqueAboutsId = req.body.key;

	console.log("the _id is: " + uniqueAboutsId);
    AboutModel.deleteOne({ _id: uniqueAboutsId}).then((e) => {console.log(e)});
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
