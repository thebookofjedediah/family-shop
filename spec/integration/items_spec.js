const request = require("request");
const base = "http://localhost:5000/";

const sequelize = require("../../src/db/models/index").sequelize;
const server = require("../../src/server");
const Item = require("../../src/db/models").Item;

describe("routes : items", () => {
  beforeEach(done => {
    this.item;

    sequelize.sync({ force: true }).then(res => {
      Item.create({
        title: "Bananas"
      }).then(item => {
        this.item = item;
        done();
      });
    });
  });

  describe("User performing CRUD actions for Item", () => {
    describe("GET /items", () => {
      it("should respond with all items", done => {
        request.get(`${base}items`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Bananas");
          done();
        });
      });
    });

    describe("POST /item/create", () => {
      it("should create a new item and respond with JSON", done => {
        const options = {
          method: "POST",
          url: `${base}item/create`,
          headers: { "Content-Type": "application/json" },
          body: { title: "Apples" },
          json: true
        };

        request.post(options, (err, res, body) => {
          Item.findOne({ where: { title: "Apples" } })
            .then(item => {
              this.item = item;
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        });
      });

      it("should not create a new item that fails validations", done => {
        const options = {
          method: "POST",
          url: `${base}item/create`,
          headers: { "Content-Type": "application/json" },
          body: { title: "" },
          json: true
        };

        request.post(options, (err, res, body) => {
          Item.findOne({ where: { title: "" } })
            .then(item => {
              expect(item).toBeNull();
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        });
      });
    });
    describe("POST /item/:id/destroy", () => {
      it("should delete a item and respond with JSON", done => {
        Item.findAll().then(items => {
          const itemCountBeforeDelete = items.length;
          expect(itemCountBeforeDelete).toBe(1);
          request.post(
            `${base}item/${this.item.id}/destroy`,
            (err, res, body) => {
              Item.findAll().then(items => {
                expect(err).toBeNull;
                expect(items.length).toBe(itemCountBeforeDelete - 1);
                done();
              });
            }
          );
        });
      });
    });
  });
});
