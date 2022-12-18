function __log(text, depth) {
  console.log("    ".repeat(depth), text);
}

function __Pipelines() {
  this.pipelines = new Map();

  this.register = function (name, pipeline) {
    if (!name) throw new Error("name is required");
    this.pipelines.set(name, pipeline);
  };

  this.list = function () {
    console.log("");
    console.log("🥳 Available pipelines:");
    this.pipelines.forEach((_, key) => console.log("   - ", key));
  };

  this.runPipeline = function (pipelineName) {
    if (this.pipelines.has(pipelineName)) {
      try {
        console.log("");
        this.pipelines.get(pipelineName)();
      } catch (error) {
        console.error("💀 Pipeline failed:");
        console.error(error);
      }
    } else {
      console.error("");
      console.error(
        `🥶 Unknown pipeline: "${
          pipelineName ?? "<none>"
        }". Possible pipelines are:`
      );
      this.pipelines.forEach((_, key) => console.error("   - ", key));
    }
  };

  this.run = function (args) {
    const pipelineName = args[2];
    switch (pipelineName) {
      case "list":
        this.list();
        break;
      case "run":
        this.runPipeline(args[3]);
        break;
      default:
        console.error(
          `🥶 Unknown command: "${
            pipelineName ?? "<none>"
          }". Possible commands are:`
        );
        console.error("   - run <pipeline-name>");
        console.error("   - list");
        break;
    }
  };
}

const GLOBAL_PIPELINE = new __Pipelines();

function __isPromise(obj) {
  return !!obj && typeof obj === "object" && obj.then && obj.catch;
}

function __toPromise([value, parentValue, depth]) {
  if (__isPromise(value)) {
    return value.then((value) => [value, parentValue, depth]);
  } else {
    return Promise.resolve([value ?? null, parentValue, depth]);
  }
}

function __runTask(task) {
  return ([value, parentValue, depth]) => {
    const newValue = task(value, parentValue, depth) ?? value;
    return __toPromise([newValue, parentValue, depth]);
  };
}

function __chain(tasks) {
  return (value, parentValue, depth) => {
    return tasks.reduce((previousValue, step) => {
      return previousValue.then(__runTask(step));
    }, __toPromise([value, parentValue, depth]));
  };
}

function __createPipeline(commandName, ...tasks) {
  const pipeline = (value, parentValue, depth = 0) => {
    return __chain(tasks)(value, parentValue, depth).then(([value]) => {
      return value;
    });
  };
  GLOBAL_PIPELINE.register(commandName, pipeline);
}

function __sequencifyPromises(values, parentValue, callback) {
  let promise = Promise.resolve();
  for (let value of values) {
    promise = promise.then(() => callback(value, parentValue));
  }
  return promise;
}

__createPipeline.group = function (description, ...tasks) {
  return (value, parentValue, depth) => {
    return new Promise((resolve, reject) => {
      __log(description.replace("%s", value), depth);
      depth++;
      resolve([value, depth]);
    })
      .then(([value, depth]) => __chain(tasks)(value, parentValue, depth))
      .then(([value]) => value);
  };
};

__createPipeline.each = function (description, ...tasks) {
  return (value, parentValue, depth) => {
    return new Promise((resolve, reject) => {
      __log(description, depth);
      depth++;
      resolve([value, parentValue, depth]);
    })
      .then(([value, parentValue, depth]) => [
        Array.isArray(value) ? value : [value],
        parentValue,
        depth,
      ])
      .then(([values, parentValue, depth]) =>
        __sequencifyPromises(values, parentValue, (value, parentValue) =>
          __chain(tasks)(value, value, depth)
        )
      )
      .then(([value]) => {
        return value;
      });
  };
};

function __createTask(description, stepCallback) {
  const step = (value, parentValue, depth = 0) => {
    __log(description.replace("%s", value ?? ""), depth);
    return stepCallback(value, parentValue);
  };
  step.description = description;
  return step;
}

export { __createPipeline as pipe, __createTask as task, GLOBAL_PIPELINE };
