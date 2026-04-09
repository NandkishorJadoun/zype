import "react-router"

declare module "react-router" {
    export interface Future {
        v8_middleware: true;
    }
}