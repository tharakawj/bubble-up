import React from "react";
import { shallow } from "enzyme";
import TopicForm from "./TopicForm";
import { MAX_TOPIC_LENGTH } from "../constants/appConstants";

test("Submit button will be disabled when 'text' is empty", () => {
  const wrapper = shallow(<TopicForm text="" />);
  expect(wrapper.find({ type: "submit" }).prop("disabled")).toEqual(true);
});

test(`Submit button will be disabled when 'text' length is greater than ${MAX_TOPIC_LENGTH}`, () => {
  const text =
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. " +
    "Aenean commodo ligula eget dolor. Aenean massa. " +
    "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. " +
    "Donec quam felis, ultricies nec, pellentesque eu, pretium quis,s";
  const wrapper = shallow(<TopicForm text={text} />);
  expect(wrapper.find({ type: "submit" }).prop("disabled")).toEqual(true);
});

test(`Submit button will be enabled when 'text' length is between 1 and ${MAX_TOPIC_LENGTH}`, () => {
  const text = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. ";
  const wrapper = shallow(<TopicForm text={text} />);
  expect(wrapper.find({ type: "submit" }).prop("disabled")).toEqual(false);
});

test(`'text' character count will be displayed out of ${MAX_TOPIC_LENGTH}`, () => {
  const text = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. ";
  const wrapper = shallow(<TopicForm text={text} />);
  expect(wrapper.find("span").text()).toEqual(
    `${text.length}/${MAX_TOPIC_LENGTH}`
  );
});

test(`Character count span will have 'error' class if the length is greater than ${MAX_TOPIC_LENGTH}`, () => {
  const text =
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. " +
    "Aenean commodo ligula eget dolor. Aenean massa. " +
    "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. " +
    "Donec quam felis, ultricies nec, pellentesque eu, pretium quis,s";
  const wrapper = shallow(<TopicForm text={text} />);
  expect(wrapper.find("span").prop("className")).toEqual("error");
});

test(`Character count span won't have 'error' class if the length is less than ${MAX_TOPIC_LENGTH}`, () => {
  const text = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. ";
  const wrapper = shallow(<TopicForm text={text} />);
  expect(wrapper.find("span").prop("className")).toEqual("");
});
