import { Low } from "lowdb";
import { LocalStorage } from "lowdb/browser";

var db = new Low(new LocalStorage("emanga"), {
  library: {},
  mangadex: {}
});

export default db;
