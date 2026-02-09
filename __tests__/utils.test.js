const createLookUpObject = require("../db/seeds/utils");

describe("createLookUpObject", () => {
  test("Returns an empty object when passed an empty array", () => {
    expect(createLookUpObject([], "sausages", "mash")).toEqual({});
  });
  test("Returns an object with a single key value pair when passed an array containing a single object.", () => {
    const input = [{ name: "Gavin", age: 47 }];
    const expected = { Gavin: 47 };
    expect(createLookUpObject(input, "name", "age")).toEqual(expected);
  });
  test("Returns an object with multiple key value pairs when passed an array containing multiple objects.", () => {
    const input = [
      { favecolour: "blue", shoesize: 8, favemusic: "metal" },
      { favecolour: "orange", shoesize: 7.5, favemusic: "jazz" },
      { favecolour: "green", shoesize: 5, favemusic: "k-pop" },
    ];
    const expected = {
      blue: "metal",
      orange: "jazz",
      green: "k-pop",
    };

    expect(createLookUpObject(input, "favecolour", "favemusic")).toEqual(
      expected,
    );
  });
  test("Doesn't mutate the original array.", () => {
    const input = [
      { favecolour: "blue", shoesize: 8, favemusic: "metal" },
      { favecolour: "orange", shoesize: 7.5, favemusic: "jazz" },
      { favecolour: "green", shoesize: 5, favemusic: "k-pop" },
    ];
    const inputCopy = [
      { favecolour: "blue", shoesize: 8, favemusic: "metal" },
      { favecolour: "orange", shoesize: 7.5, favemusic: "jazz" },
      { favecolour: "green", shoesize: 5, favemusic: "k-pop" },
    ];
    const expected = {
      blue: "metal",
      orange: "jazz",
      green: "k-pop",
    };
    const output = createLookUpObject(input, "favecolour", "favemusic");

    expect(input).toEqual(inputCopy);
  });
});
