function solution(commands) {
  const t = table();

  const answer = [];

  for (const command of commands) {
    const [keyword, ...rest] = command.split(" ");

    if (keyword === "UPDATE") {
      if (rest.length === 3) {
        const [r, c, value] = rest;
        const cell = {
          r: parseInt(r),
          c: parseInt(c),
        };
        t.update(cell, value);
      } else {
        const [value1, value2] = rest;
        t.updateByValue(value1, value2);
      }
    } else if (keyword === "MERGE") {
      const [r1, c1, r2, c2] = rest;
      const cell1 = {
        r: parseInt(r1),
        c: parseInt(c1),
      };
      const cell2 = {
        r: parseInt(r2),
        c: parseInt(c2),
      };
      t.merge(cell1, cell2);
    } else if (keyword === "UNMERGE") {
      const [r, c] = rest;
      const cell = {
        r: parseInt(r),
        c: parseInt(c),
      };
      t.unmerge(cell);
    } else if (keyword === "PRINT") {
      const [r, c] = rest;
      const cell = {
        r: parseInt(r),
        c: parseInt(c),
      };
      const value = t.print(cell);
      answer.push(value);
    }
  }

  return answer;
}

function table() {
  const ROWS = 50;
  const COLUMNS = 50;

  let valueKey = 0;
  const values = new Map();
  const valuePointers = new Map();

  function toCellId(cell) {
    return (cell.r - 1) * COLUMNS + cell.c - 1;
  }

  function update(cell, value) {
    const id = toCellId(cell);

    if (valuePointers.has(id)) {
      const myValueKey = valuePointers.get(id);
      values.set(myValueKey, value);
      return;
    }

    const myValueKey = valueKey;
    valueKey += 1;
    valuePointers.set(id, myValueKey);
    values.set(myValueKey, value);
  }

  function updateByValue(value1, value2) {
    const entries = values.entries();

    while (true) {
      const entry = entries.next();

      if (entry.done) {
        break;
      }

      const [key, value] = entry.value;

      if (value === value1) {
        values.set(key, value2);
      }
    }
  }

  function merge(cell1, cell2) {
    const id1 = toCellId(cell1);
    const id2 = toCellId(cell2);

    const hasPointer1 = valuePointers.has(id1);
    const hasPointer2 = valuePointers.has(id2);

    if (hasPointer1 && hasPointer2) {
      const myValueKey1 = valuePointers.get(id1);
      const myValueKey2 = valuePointers.get(id2);
      const hasValue1 = values.get(myValueKey1);
      const hasValue2 = values.get(myValueKey2);

      if (!hasValue1 && hasValue2) {
        const entries = valuePointers.entries();
        while (true) {
          const entry = entries.next();

          if (entry.done) {
            break;
          }

          const [key, value] = entry.value;

          if (value === myValueKey1) {
            valuePointers.set(key, myValueKey2);
          }
        }

        return;
      }

      const entries = valuePointers.entries();
      while (true) {
        const entry = entries.next();

        if (entry.done) {
          break;
        }

        const [key, value] = entry.value;

        if (value === myValueKey2) {
          valuePointers.set(key, myValueKey1);
        }
      }

      return;
    } else if (hasPointer1) {
      const myValueKey = valuePointers.get(id1);
      valuePointers.set(id2, myValueKey);
      return;
    } else if (hasPointer2) {
      const myValueKey = valuePointers.get(id2);
      valuePointers.set(id1, myValueKey);
      return;
    }

    const myValueKey = valueKey;
    valueKey += 1;
    valuePointers.set(id1, myValueKey);
    valuePointers.set(id2, myValueKey);
  }

  function unmerge(cell) {
    const id = toCellId(cell);

    if (!valuePointers.has(id)) {
      return;
    }

    const myValueKey = valuePointers.get(id);
    const entries = valuePointers.entries();

    while (true) {
      const entry = entries.next();

      if (entry.done) {
        break;
      }

      const [key, value] = entry.value;

      if (key !== id && value === myValueKey) {
        valuePointers.delete(key);
      }
    }
  }

  function print(cell) {
    const id = toCellId(cell);
    if (!valuePointers.has(id)) {
      return "EMPTY";
    }

    const myValueKey = valuePointers.get(id);
    if (!values.has(myValueKey)) {
      return "EMPTY";
    }

    return values.get(myValueKey);
  }

  return {
    update,
    updateByValue,
    merge,
    unmerge,
    print,
    valuePointers,
    values,
  };
}
