const expect = require('chai').expect;

describe('Creating records', () => {
	it('saves a user', () => {
		expect({a: 2})
			.to.be.deep.equal({a: 2})
			.and.to.have.property('a')
			.and.not.to.have.property('b');

		expect({a: 1, b: 2, c: 3}).to.include({a: 1, b: 2, c:3});
	});
});