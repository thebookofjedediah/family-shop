const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:5000/users/";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {
  beforeEach(done => {
    sequelize
      .sync({ force: true })
      .then(() => {
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });

  describe("POST /users", () => {
    it("should create a new user with valid values and respond with JSON", done => {
      const options = {
        url: base,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          email: "jean@hotmail.com",
          password: "123456789",
          passwordConfirmation: "123456789"
        },
        json: true
      };

      request.post(options, (err, res, body) => {
        User.findOne({ where: { email: "jean@hotmail.com" } })
          .then(user => {
            this.user = user;
            expect(user).not.toBeNull();
            expect(user.email).toBe("jean@hotmail.com");
            expect(user.id).toBe(1);
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });

    it("should not create a new user with invalid attributes and respond with JSON", done => {
      request.post(
        {
          url: base,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: {
            email: "myemail",
            password: "123456789"
          },
          json: true
        },
        (err, res, body) => {
          User.findOne({ where: { email: this.user.email } })
            .then(user => {
              expect(user).toBeNull();
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        }
      );
    });
  });

  describe("POST /users/sign_in", () => {
    beforeEach(done => {
      sequelize.sync({ force: true }).then(res => {
        User.create({
          email: this.user.email,
          password: this.user.password
        }).then(user => {
          console.log(user);
          done();
        });
      });

      it("should successfully respond user data as JSON", done => {
        request.post(
          {
            url: `${base}sign_in`,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: {
              email: this.user.email,
              password: this.user.password
            },
            json: true
          },
          (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain(this.user.email);
            done();
          }
        );
      });
    });
  });
});
