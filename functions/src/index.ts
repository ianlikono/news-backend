import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {
  getAllTechArticles,
  getBitcoinsArticles,
  getBusinessArticles,
  getEntertainmentArticles,
  getHollywoodArticles,
  getPoliticsArticles,
  getSportsArticles,
  getTrendingArticles
} from "./controllers/articles";

admin.initializeApp(functions.config().firebase);

const validateFirebaseIdToken = async (req: any, res: any, next: any) => {
  console.log("Check if request is authorized with Firebase ID token");

  if (
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")) &&
    !(req.cookies && req.cookies.__session)
  ) {
    console.error(
      "No Firebase ID token was passed as a Bearer token in the Authorization header.",
      "Make sure you authorize your request by providing the following HTTP header:",
      "Authorization: Bearer <Firebase ID Token>",
      'or by passing a "__session" cookie.'
    );
    res.status(403).send("Unauthorized");
    return;
  }

  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else if (req.cookies) {
    console.log('Found "__session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    // No cookie
    res.status(403).send("Unauthorized");
    return;
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    console.log("ID Token correctly decoded", decodedIdToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (error) {
    console.error("Error while verifying Firebase ID token:", error);
    res.status(403).send("Unauthorized");
    return;
  }
};

const app = express();

const whitelist = ["http://localhost:3000", "http://example2.com"];

const corsOptions = {
  origin: function(origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(validateFirebaseIdToken);
app.use(cookieParser("S2222SS$$$##FFFD#$R#%FF"));
app.get("/techarticles", getAllTechArticles);
app.get("/trendingarticles", getTrendingArticles);
app.get("/businessarticles", getBusinessArticles);
app.get("/bitcoinarticles", getBitcoinsArticles);
app.get("/entertainmentarticles", getEntertainmentArticles);
app.get("/politicsarticles", getPoliticsArticles);
app.get("/hollywoodarticles", getHollywoodArticles);
app.get("/sportsarticles", getSportsArticles);

export const routes = functions.https.onRequest(app);

export const userJoined = functions.auth.user().onCreate(user => {
  if (user.providerData.length) {
    const userDoc = {
      email: user.email,
      displayName: user.displayName,
      photoUrl: user.photoURL,
      userId: user.uid
    };
    admin
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set(userDoc)
      .then(writeResult => {
        return;
      })
      .catch(err => {
        console.log(err);
        return;
      });
  }
});
