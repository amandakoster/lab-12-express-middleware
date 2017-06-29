'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const faker = require('faker');
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');
const Note = require('../model/note.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempNote;

describe('testing note routes', () => {
  before(server.start);
  after(server.stop);

  describe('test POST /api/notes',() => {
    it('should respond with a note', () => {
      return superagent.post(`${API_URL}/api/notes`)
      .send({content: 'grasshopper'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.content).toEqual('grasshopper');
        tempNote = res.body;
      });
    });
    it('should respond with 400', () => {
      superagent.post(`${API_URL}/api/notes`)
    .catch(err => {
      expect(err.status).toEqual(400);
    });
    });
  });

  describe('testing GET /api/note', () => {
    it('should respond with a note', () => {
      return superagent.get(`${API_URL}/api/notes/${tempNote._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempNote._id);
        expect(res.body.content).toEqual('grasshopper');
        expect(res.body.created).toEqual(tempNote.created);
      });
    });
  });

  describe('testing PUT requests to /api/notes', () => {
    afterEach(() => Note.remove({}));
    beforeEach(() => {
      return new Note ({
        content: 'Evan',
      })
      .save()
      .then(res => {
        tempNote = res;
      });
    });
    it('should return a 200 and update the note with correct passed info', () => {
      return superagent.put(`${API_URL}/api/notes/${tempNote._id}`)
      .send({content: 'Patricia'})
      .then(res => {
        expect(res.status).toEqual(200);
      });
    });
    it('should return a 400 for a bad request if the body is invalid', () => {
      return superagent.put(`${API_URL}/api/notes/${tempNote._id}`)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
    it('should return a 404 for a not found if doesnt exist', () => {
      return superagent.put(`${API_URL}/api/notes/78787878787`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });

  describe('testing DELETE /api/notes/:id', () => {
    afterEach(() => Note.remove({}));
    beforeEach(() => {
      return new Note({
        content: 'Patricia',
      })
        .save()
        .then(note => {
          tempNote = note;
        });
    });

    it('should delete the note and return a 204', () => {
      console.log('tempNote', tempNote);
      return superagent.delete(`${API_URL}/api/notes/${tempNote._id}`)
        .then(res => {
          expect(res.status).toEqual(204);
        });
    });
    it('should return a 404 for not found', () => {
      return superagent.delete(`${API_URL}/api/notes/${tempNote._id}`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });
});
