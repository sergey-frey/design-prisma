import { mount } from "svelte";
import App from "./app/App.svelte";

import "./app/styles/global.css";

const app = mount(App, { target: document.body });

export default app;
