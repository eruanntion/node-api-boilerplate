const expect = require('chai').expect;

describe('Creating records', () => {
	it('saves a user', () => {
		expect({a: 2})
			.to.be.deep.equal({a: 2})
			.and.to.has.property('a');
	});
});