let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
let server = require('../index');
const mongoose = require('mongoose');

const Delivery = mongoose.model('Delivery');
const Package = mongoose.model('Package');

describe('/GET api/package', () => {
    it('it should GET an array', (done) => {
    chai.request(server)
        .get('/api/package')
        .end((err, res) => {
              (res).should.have.status(200);
              (res.body).should.be.a('array');
              done();
           });
        });
    });

    describe('/POST api/package', () => {
        it('it should not create package without description', (done) => {
        let package = {
            weight: 50,
            width: 20,
            height: 30,
            depth: 45,
            from_name: 'ppmlo',
            form_address: 'kdfh',
            from_location: {
                lat: 2.25,
                lng: 2.36
            },
            to_name: 'ppmlo',
            to_address: 'kdfh',
            to_location: {
                lat: 2.25,
                lng: 2.36
            },
        }
        chai.request(server)
            .post('/api/package')
            .send(package)
            .end((err, res) => {
                  (res).should.have.status(500);
                  (res.body).should.be.a('object');
                  (res.body).should.have.property('errors')
                  done();
               });
            });
        });


        describe('/GET api/package/:id', () => {
            it('it should get package with given id', (done) => {
                Package.create( {
                    description: 're bhnf yure',
                    weight: 50,
                    width: 20,
                    height: 30,
                    depth: 45,
                    from_name: 'ppmlo',
                    from_address: 'kdfh',
                    from_location: {
                        lat: 2.25,
                        lng: 2.36
                    },
                    to_name: 'ppmlo',
                    to_address: 'kdfh',
                    to_location: {
                        lat: 2.25,
                        lng: 2.36
                    },
                })
                .then((package) => {
                    chai.request(server)
                    .get('/api/package/' + package.id)
                    .end((err, res) => {
                          (res).should.have.status(200);
                          (res.body).should.be.a('object');
                          (res.body).should.have.property('description');
                          (res.body).should.have.property('height');
                          (res.body).should.have.property('weight');
                          (res.body).should.have.property('width');
                          (res.body).should.have.property('depth');
                          (res.body).should.have.property('from_name');
                          (res.body).should.have.property('from_address');
                          (res.body).should.have.property('from_location');
                          (res.body).should.have.property('to_name');
                          (res.body).should.have.property('to_address');
                          (res.body).should.have.property('to_location');
                          done();
                       });
                })
                .catch ((err) => {
                    console.log(err)
                })
                });
            });


            describe('/PUT api/package/:id', () => {
                it('it should update package with given id', (done) => {
                    Package.create( {
                        description: 're bhnf yure',
                        weight: 50,
                        width: 20,
                        height: 30,
                        depth: 45,
                        from_name: 'ppmlo',
                        from_address: 'kdfh',
                        from_location: {
                            lat: 2.25,
                            lng: 2.36
                        },
                        to_name: 'ppmlo',
                        to_address: 'kdfh',
                        to_location: {
                            lat: 2.25,
                            lng: 2.36
                        },
                    })
                    .then((package) => {
                        chai.request(server)
                        .put('/api/package/' + package.id)
                        .send({width: 5514})
                        .end((err, res) => {
                              (res).should.have.status(200);
                              (res.body).should.be.a('object');
                              (res.body).should.have.property('width').eql(5514);
                              (res.body).should.have.property('height');
                              (res.body).should.have.property('weight');
                              (res.body).should.have.property('width');
                              (res.body).should.have.property('depth');
                              (res.body).should.have.property('from_name');
                              (res.body).should.have.property('from_address');
                              (res.body).should.have.property('from_location');
                              (res.body).should.have.property('to_name');
                              (res.body).should.have.property('to_address');
                              (res.body).should.have.property('to_location');
                              done();
                           });
                    })
                    .catch ((err) => {
                        console.log(err)
                    })
                    });
                });


                describe('/DELETE api/package/:id', () => {
                    it('it should update package with given id', (done) => {
                        Package.create( {
                            description: 're bhnf yure',
                            weight: 50,
                            width: 20,
                            height: 30,
                            depth: 45,
                            from_name: 'ppmlo',
                            from_address: 'kdfh',
                            from_location: {
                                lat: 2.25,
                                lng: 2.36
                            },
                            to_name: 'ppmlo',
                            to_address: 'kdfh',
                            to_location: {
                                lat: 2.25,
                                lng: 2.36
                            },
                        })
                        .then((package) => {
                            chai.request(server)
                            .delete('/api/package/' + package.id)
                            .end((err, res) => {
                                  (res).should.have.status(200);
                                  (res.body).should.be.a('object');
                                  done();
                               });
                        })
                        .catch ((err) => {
                            console.log(err)
                        })
                        });
                    });