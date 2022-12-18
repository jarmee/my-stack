import { argv } from "process";
import { GLOBAL_PIPELINE } from "./lib/core/pipeline.mjs";
import "./lib/pipelines/index.mjs";

GLOBAL_PIPELINE.run(argv);
