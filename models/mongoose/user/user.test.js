const expect = require('chai').expect;
const sinon = require('sinon');
const _ = require('lodash');


function once(fn) {
	var returnValue, called = false;
	return function () {
		if (!called) {
			called = true;
			returnValue = fn.apply(this, arguments);
		}
		return returnValue;
	};
}

describe('Creating records', () => {
	it('saves a user', () => {
		expect({a: 2})
			.to.be.deep.equal({a: 2})
			.and.to.have.property('a')
			.and.not.to.have.property('b');

		expect({a: 1, b: 2, c: 3}).to.include({a: 1, b: 2, c:3});
	});
});

describe('Sinon tests', () => {
	it('calls the original function', function () {
		var callback = sinon.spy();
		var proxy = once(callback);

		proxy();

		expect(callback.called).to.be.true;
	});

	it('calls the original function only once', function () {
		var callback = sinon.spy();
		var proxy = once(callback);

		proxy();
		proxy();

		expect(callback.calledOnce).to.be.true;
		expect(callback.callCount).to.equal(1);
		// ...or:
		// assert.equals(callback.callCount, 1);
	});

	it("returns the return value from the original function", function () {
		var callback = sinon.stub().returns(42);
		var proxy = once(callback);

		expect(proxy()).to.equal(42);
	});
});

describe('debounce', function() {
	function debounce(targetFn, delay) {
		return function() {
			targetFn();
		};
	}

	it('should call returned function after delay passes', function(done) {
		var delay = 5;
		var targetFn = function() {
			done();
		};

		var delayedFn = debounce(targetFn, delay);

		delayedFn();
	});

	it('should not run debounced function too early', function() {
		var clock = sinon.useFakeTimers();

		var delay = 100;
		var targetFn = sinon.spy();

		var delayedFn = _.debounce(targetFn, delay);

		delayedFn();
		clock.tick(delay - 1);

		clock.restore();
		sinon.assert.notCalled(targetFn);
	});
});

