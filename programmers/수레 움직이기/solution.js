function solution(maze) {
  const n = maze.length;
  const m = maze[0].length;

  const red = getPosFromMaze(maze, 1);
  const blue = getPosFromMaze(maze, 2);
  const redEnd = getPosFromMaze(maze, 3);
  const blueEnd = getPosFromMaze(maze, 4);
  let visitedRed = getInitialVisited(n, m);
  let visitedBlue = getInitialVisited(n, m);
  visitedRed = visit(visitedRed, red);
  visitedBlue = visit(visitedBlue, blue);

  const minTurns = dfs(
    maze,
    red,
    blue,
    redEnd,
    blueEnd,
    visitedRed,
    visitedBlue,
    0,
    Infinity
  );
  if (minTurns === Infinity) {
    return 0;
  }

  return minTurns;
}

function dfs(
  maze,
  red,
  blue,
  redEnd,
  blueEnd,
  visitedRed,
  visitedBlue,
  turns,
  minTurns
) {
  let currentMinTurns = minTurns;
  const isRedEnd = isSame(red, redEnd);
  const isBlueEnd = isSame(blue, blueEnd);

  if (turns >= currentMinTurns) {
    return currentMinTurns;
  }

  if (isRedEnd && isBlueEnd) {
    return turns;
  }

  const dirs = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ];

  for (let r = 0; r < dirs.length; r++) {
    const redD = dirs[r];
    let newRed = {
      x: red.x + redD.x,
      y: red.y + redD.y,
    };
    if (isRedEnd) {
      newRed = {
        ...red,
      };
    }

    if (isOutOfBound(maze, newRed)) {
      continue;
    } else if (isWall(maze, newRed)) {
      continue;
    } else if (!isRedEnd && isVisited(visitedRed, newRed)) {
      continue;
    }
    for (let b = 0; b < dirs.length; b++) {
      const blueD = dirs[b];
      let newBlue = {
        x: blue.x + blueD.x,
        y: blue.y + blueD.y,
      };
      if (isBlueEnd) {
        newBlue = {
          ...blue,
        };
      }

      if (isOutOfBound(maze, newBlue)) {
        continue;
      } else if (isWall(maze, newBlue)) {
        continue;
      } else if (!isBlueEnd && isVisited(visitedBlue, newBlue)) {
        continue;
      } else if (isSame(newRed, newBlue)) {
        continue;
      } else if (isSame(red, newBlue) && isSame(newRed, blue)) {
        continue;
      }

      const newVisitedRed = visit(visitedRed, newRed);
      const newVisitedBlue = visit(visitedBlue, newBlue);

      currentMinTurns = Math.min(
        currentMinTurns,
        dfs(
          maze,
          newRed,
          newBlue,
          redEnd,
          blueEnd,
          newVisitedRed,
          newVisitedBlue,
          turns + 1,
          currentMinTurns
        )
      );
    }
  }

  return currentMinTurns;
}

function getPosFromMaze(maze, value) {
  const n = maze.length;
  const m = maze[0].length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const currentValue = maze[i][j];

      if (currentValue === value) {
        return {
          x: j,
          y: i,
        };
      }
    }
  }

  return null;
}

function getInitialVisited(n, m) {
  const visited = Array.from(Array(n), () => Array(m).fill(false));

  return visited;
}

function visit(visited, pos) {
  const newRow = [...visited[pos.y]];
  const newVisited = [...visited];

  newRow[pos.x] = true;
  newVisited[pos.y] = newRow;

  return newVisited;
}

function isVisited(visited, pos) {
  return visited[pos.y][pos.x];
}

function isOutOfBound(maze, pos) {
  const n = maze.length;
  const m = maze[0].length;

  return pos.x < 0 || pos.x >= m || pos.y < 0 || pos.y >= n;
}

function isWall(maze, pos) {
  const WALL = 5;
  const value = maze[pos.y][pos.x];

  return value === WALL;
}

function isSame(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}
