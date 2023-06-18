
require("dotenv").config();
// console.log(process.env);

const mongoose = require('mongoose');

const db1 = mongoose.createConnection(process.env.MONGODB_URI);
const dbResources = mongoose.createConnection(process.env.MONGODB_URI_RESOURCES + "Test2")
const dbAnnouncements = mongoose.createConnection(process.env.MONGODB_URI_ANNOUNCEMENTS + "Announcements")
const dbAdmissions = mongoose.createConnection(process.env.MONGODB_URI_ADMISSIONS + "Admissions")
const dbAbout = mongoose.createConnection(`${process.env.MONGODB_URI_ABOUT}About`)
const dbEvents = mongoose.createConnection(process.env.MONGODB_URI_EVENTS + "Events")
const dbPlacements = mongoose.createConnection(process.env.MONGODB_URI_PLACEMENTS + "Placements")

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
	phone: {
		type: String
	},
	resumeLink: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

// Schema for Resources-page
const EventsSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	desc: {
		type: String,
	},
	link: {
		type: String
	},
	img : {
		type: String
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

// Schema for Resources-page
const placementSchema = new mongoose.Schema({
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

const User = db1.model('users', UserSchema);
const ResourcesModel = dbResources.model('user', ResourcesSchema);
const AdmissionsModel = dbAdmissions.model("admission", AdmissionSchema);
const AnnouncementsModel = dbAnnouncements.model("announcement", AdmissionSchema);
const AboutModel = dbAbout.model("about", AboutSchema);
const EventsModel = dbEvents.model("event", EventsSchema);
const PlacementsModel = dbPlacements.model("placement", placementSchema);
// User.createIndexes();

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
// app.use((req, res, next) => {
// 	res.header("Access-Control-Allow-Origin", "*")
//   })
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

app.post("/registerResources", async (req, resp) => {
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

app.post("/registerAbouts", async (req, resp) => {
	console.log(req.body);
	try {
		const userAbouts = new AboutModel(req.body);
		let resultAbouts = await userAbouts.save();
		resultAbouts = resultAbouts.toObject();

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});

app.post("/registerEvents", async (req, resp) => {
	console.log(req.body);
	try {
		const userEvents = new EventsModel(req.body);
		let resultEvents = await userEvents.save();
		resultEvents = resultEvents.toObject();

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});

app.post("/registerPlacements", async (req, resp) => {
	console.log(req.body);
	try {
		const userPlacements = new PlacementsModel(req.body);
		let resultPlacements = await userPlacements.save();
		resultPlacements = resultPlacements.toObject();

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

app.get("/apiEvents", (req, res) => {
	EventsModel.find({}).then((data) => {
		res.send(data)
		return data;
	})
})

app.get("/apiPlacements", (req, res) => {
	PlacementsModel.find({}).then((data) => {
		res.send(data)
		return data;
	})
})

app.post("/delete", async (req, res) => {
	console.log(req.body)
	const uniqueID = req.body.uniqueID;

	User.deleteOne({ _id: uniqueID }).then((e) => { console.log(e) });

})

// resource page
app.post("/deleteResources", async (req, res) => {
	console.log(req.body)
	const uniqueResourcesId = req.body.key;

	console.log("the _id is: " + uniqueResourcesId);
	ResourcesModel.deleteOne({ _id: uniqueResourcesId }).then((e) => { console.log(e) });
})

// Admissions page
app.post("/deleteAdmissions", async (req, res) => {
	console.log(req.body)
	const uniqueAdmissionsId = req.body.key;

	console.log("the _id is: " + uniqueAdmissionsId);
	AdmissionsModel.deleteOne({ _id: uniqueAdmissionsId }).then((e) => { console.log(e) });
})

// Announcements page
app.post("/deleteAnnouncements", async (req, res) => {
	console.log(req.body)
	const uniqueAnnouncementsId = req.body.key;

	console.log("the _id is: " + uniqueAnnouncementsId);
	AnnouncementsModel.deleteOne({ _id: uniqueAnnouncementsId }).then((e) => { console.log(e) });
})

// Abouts page
app.post("/deleteAbouts", async (req, res) => {
	console.log(req.body)
	const uniqueAboutsId = req.body.key;

	console.log("the _id is: " + uniqueAboutsId);
	AboutModel.deleteOne({ _id: uniqueAboutsId }).then((e) => { console.log(e) });
})

// Events page
app.post("/deleteEvents", async (req, res) => {
	console.log(req.body)
	const uniqueEventsId = req.body.key;

	console.log("the _id is: " + uniqueEventsId);
	EventsModel.deleteOne({ _id: uniqueEventsId }).then((e) => { console.log(e) });
})

// resource page
app.post("/deletePlacements", async (req, res) => {
	console.log("This is /deletePlacements...")
	console.log(req.body)
	const uniquePlacementsId = req.body.key;

	console.log("the _id is: " + uniquePlacementsId);
	PlacementsModel.deleteOne({ _id: uniquePlacementsId }).then((e) => { console.log(e) });
})

app.post("/updateAbouts", async (req, res) => {
	console.log("This is /updateAbouts...")
	const objBody = req.body;
	console.log(objBody);
	const aboutsUniqueId = req.body.documentKey;

	console.log("The _id is " + aboutsUniqueId);
	AboutModel.updateOne({ _id: aboutsUniqueId }, {
		$set: {
			name: objBody.name,
			img: objBody.img,
			desig: objBody.desig,
			email: objBody.email,
			phone: objBody.phone,
			resumeLink: objBody.resumeLink
		}
	}).then(ack => console.log(ack));
})

app.post("/updateResources", async (req, res) => {
	console.log("This is /updateResources...")
	const objBody = req.body;
	console.log(objBody);
	const resourcesUniqueId = req.body.documentKey;

	console.log("The _id is " + resourcesUniqueId);
	ResourcesModel.updateOne({ _id: resourcesUniqueId }, {
		$set: {
			title: objBody.title,
			desc: objBody.desc,
			link: objBody.link
		}
	}).then(ack => {
		console.log(ack);
		if (ack.modifiedCount) {
			console.log("Successfully updated...");
			// res.redirect("https://www.google.com/");
		}
	});
})

app.post("/updateAdmission", async (req, res) => {
	console.log("This is /updateAdmission...")
	const objBody = req.body;
	console.log(objBody);
	const admissionUniqueId = req.body.documentKey;

	console.log("The _id is " + admissionUniqueId);
	AdmissionsModel.updateOne({ _id: admissionUniqueId }, {
		$set: {
			title: objBody.title,
			desc1: objBody.desc1,
			desc2: objBody.desc2,
			link1: objBody.link1,
			link2: objBody.link2,
			link3: objBody.link3,
			link4: objBody.link4,
		}
	}).then(ack => {
		console.log(ack);
		if (ack.modifiedCount) {
			console.log("Successfully updated...");
			// res.redirect("https://www.google.com/");
		}
	});
})

app.post("/updateAnnouncements", async (req, res) => {
	console.log("This is /updateAnnouncements...")
	const objBody = req.body;
	console.log(objBody);
	const announcementsUniqueId = req.body.documentKey;

	console.log("The _id is " + announcementsUniqueId);
	AnnouncementsModel.updateOne({ _id: announcementsUniqueId }, {
		$set: {
			title: objBody.title,
			desc1: objBody.desc1,
			desc2: objBody.desc2,
			link1: objBody.link1,
		}
	}).then(ack => {
		console.log(ack);
		if (ack.modifiedCount) {
			console.log("Successfully updated...");
			// res.redirect("https://www.google.com/");
		}
	});
})

app.post("/updateEvents", async (req, res) => {
	console.log("This is /updateEvents...")
	const objBody = req.body;
	console.log(objBody);
	const eventsUniqueId = req.body.documentKey;

	console.log("The _id is " + eventsUniqueId);
	EventsModel.updateOne({ _id: eventsUniqueId }, {
		$set: {
			title: objBody.title,
			desc: objBody.desc,
			link: objBody.link,
			img : objBody.img
		}
	}).then(ack => {
		console.log(ack);
		if (ack.modifiedCount) {
			console.log("Successfully updated...");
			// res.redirect("https://www.google.com/");
		}
	});
})

app.post("/updatePlacements", async (req, res) => {
	console.log("This is /updateResources...")
	const objBody = req.body;
	console.log(objBody);
	const placementsUniqueId = req.body.documentKey;

	console.log("The _id is " + placementsUniqueId);
	PlacementsModel.updateOne({ _id: placementsUniqueId }, {
		$set: {
			title: objBody.title,
			desc: objBody.desc,
			link: objBody.link
		}
	}).then(ack => {
		console.log(ack);
		if (ack.modifiedCount) {
			console.log("Successfully updated...");
			// res.redirect("https://www.google.com/");
		}
	});
})

// listening...
app.listen(port, () => {
	console.log("Listening on the PORT for requests...")
})
