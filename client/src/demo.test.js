import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

// import Forgotpsw from './User/Containers/Forgotpsw/Forgotpsw'
import Home from './User/Containers/Home/Home'
import AddDetails from './User/Containers/PickupReq/addDetails'

configure({ adapter: new Adapter() });

describe("should manage authentication", () => {
    it("should render Home component correctly", function () {
        const wrapper = shallow(<Home />);
        const expectedToBeIn = <h3>Sell Your Garbage in 3 easy Steps</h3>
        const actualValue = wrapper.contains(expectedToBeIn);
        expect(actualValue).toBe(true)
    });
    it("should render pickupRequest component correctly", function () {
        const wrapper = shallow(<AddDetails />);
        const expectedToBeIn = <h3>Add Your Details</h3>
        const actualValue = wrapper.contains(expectedToBeIn);
        expect(actualValue).toBe(true);
    });
})


