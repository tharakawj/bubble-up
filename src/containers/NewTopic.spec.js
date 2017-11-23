import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { NewTopic } from "./NewTopic";
import * as request from "../utils/request";

test("Post 'state.text' as object when the form submitted", () => {
  const topic = { id: "Id1", text: "topic text", upcotes: 0 };
  request.post = jest.fn();
  request.post.mockReturnValue(Promise.resolve(topic));

  const props = {
    topicCreated: jest.fn(),
    history: {
      push: jest.fn()
    }
  };

  let wpRef = null;

  const wrapper = mount(
    <MemoryRouter>
      <NewTopic {...props} ref={ref => (wpRef = ref)} />
    </MemoryRouter>
  );

  const text = "topic";
  wpRef.setState({ text });

  wrapper.find("button").simulate("submit");

  expect(request.post.mock.calls[0][1]).toEqual({ text });
});

test("Trigger 'topicCreated' and 'history.push('/')' after posting data successfully", done => {
  const topic = { id: "Id1", text: "topic text", upcotes: 0 };
  request.post = () => Promise.resolve(topic);

  const props = {
    topicCreated: jest.fn(),
    history: {
      push: jest.fn()
    }
  };
  const wrapper = mount(
    <MemoryRouter>
      <NewTopic {...props} />
    </MemoryRouter>
  );

  wrapper.find("button").simulate("submit");

  setTimeout(() => {
    expect(props.topicCreated.mock.calls[0][0]).toEqual(topic);
    expect(props.history.push.mock.calls[0][0]).toEqual("/");
    done();
  }, 0);
});

test("Set error message when posting data is unsuccessful", done => {
  const error = { message: "error4" };
  request.post = () => Promise.reject(error);

  const props = {
    topicCreated: jest.fn(),
    history: {
      push: jest.fn()
    }
  };
  const wrapper = mount(
    <MemoryRouter>
      <NewTopic {...props} />
    </MemoryRouter>
  );

  wrapper.find("button").simulate("submit");

  setTimeout(() => {
    expect(wrapper.find(NewTopic).instance().state.error).toBe(error.message);
    done();
  }, 0);
});
