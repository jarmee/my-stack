import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";

import { AppComponent } from "./app/app.component";
import { ROUTES } from "./routes";

bootstrapApplication(AppComponent, {
  providers: [provideRouter(ROUTES)],
}).catch((err) => console.error(err));
