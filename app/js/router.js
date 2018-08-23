let gameObject = require("./gameobject.js");
let stage = require("./stage.js");
let boxHandlers = require("./box-handlers.js");
require("../jsx/player.jsx");

import ReactDOM from "react-dom";

import backbone_logo from "../assets/img/backbone_logo.png";
import react_logo from "../assets/img/react_logo.png";
import css_logo from "../assets/img/css_logo.png";
import html5_logo_pixel from "../assets/img/html5_logo_pixel.png";
import js_logo from "../assets/img/js_logo.png";
import webpack_logo from "../assets/img/webpack_logo.png";

export class Router {
    constructor() {
        window.onpopstate = function(event) {
            let route = event.state.route;
            this.loadRoute(route);
        }.bind(this);
    }

    loadRoute(route) {
        let stageIndex = window.Game.findStage(route);

        // remove the ReactJS Player component from the stage
        if (window.Game.player) {
            ReactDOM.unmountComponentAtNode(document.querySelector("#" + window.Game.activeStage.config.playerOutletId));
            
            if (window.Game.activeStage) {
                window.Game.activeStage.removeObject(window.Game.player);

                // clear the stage?
                if (window.Game.activeStage.config.name != route) {
                    window.Game.activeStage.clearStage();
                    window.Game.removeStage(window.Game.activeStage);
                }
            }
        }

        switch (route) {
            case "home":
            case "":
                if (route === "") {
                    route = "home";
                }

                if (stageIndex !== false) {
                    window.Game.activeStage = window.Game.stages[stageIndex];
                }
                else {
                    // stage has never been created, so create it.
                    let mainStage = new stage.Stage({
                        name: route,
                        theme: "mountains",
                        targetOutletSelector: "#stage",
                        playerOutletId: "player",
                        gameObjects: [
                            // ground
                            new gameObject.GameObject({
                                classPrefix: "ground-center-"
                            },{ static: true, type: "ground" }),
                            // About stage tunnel
                            new gameObject.GameObject({
                                classPrefix: "tunnel-",
                                label: "About",
                                route: "about"
                            }, { top: 1, left: 300, type: "tunnel"}),
                            // Skills stage tunnel
                            new gameObject.GameObject({
                                classPrefix: "tunnel-",
                                label: "Skills",
                                route: "skills"
                            }, { top: 1, left: 400, type: "tunnel" }),
                            // Experience stage tunnel
                            new gameObject.GameObject({
                                classPrefix: "tunnel-",
                                label: "Experience",
                                route: "experience"
                            }, { top: 1, left: 500, type: "tunnel" })
                        ]
                    });

                    window.Game.stages.push(mainStage);
                    window.Game.activeStage = window.Game.stages[window.Game.findStage(route)];
                }
            break;
            case "about":
                if (stageIndex !== false) {
                    window.Game.activeStage = window.Game.stages[stageIndex];
                }
                else {
                    // stage has never been created, so create it.
                    let aboutStage = new stage.Stage({
                        name: "about",
                        theme: "mountains",
                        targetOutletSelector: "#stage",
                        playerOutletId: "player",
                        gameObjects: [
                            // ground
                            new gameObject.GameObject({
                                classPrefix: "ground-center-"
                            },{ static: true, type: "ground" }),
                            // About Box
                            new gameObject.GameObject({
                                classPrefix: "box-",
                                float: true,
                                onHitBottom: boxHandlers.aboutBox,
                                hits: 1
                            }, { static: true, top: 170, left: 250, type: "box" }),
                            // Home tunnel
                            new gameObject.GameObject({
                                classPrefix: "tunnel-",
                                label: "Home",
                                route: "home"
                            }, { top: 1, left: 400, type: "tunnel" }),
                        ]
                    });

                    window.Game.stages.push(aboutStage);
                    window.Game.activeStage = window.Game.stages[window.Game.findStage(route)];
                }
            break;
            case "skills":
                if (stageIndex !== false) {
                    window.Game.activeStage = window.Game.stages[stageIndex];
                }
                else {
                    // stage has never been created, so create it.
                    let skillsStage = new stage.Stage({
                        name: "skills",
                        theme: "mountains",
                        targetOutletSelector: "#stage",
                        playerOutletId: "player",
                        gameObjects: [
                            // ground
                            new gameObject.GameObject({
                                classPrefix: "ground-center-"
                            },{ static: true, type: "ground" }),
                            // HTML5 Box
                            new gameObject.GameObject({
                                classPrefix: "box-",
                                float: true,
                                onHitBottom: boxHandlers.imageBox,
                                imageForBox: html5_logo_pixel,
                                hits: 1,
                                label: "-->HTML5",
                                labelPosition: "fixed",
                                labelTop: "15px",
                                labelLeft: "15px",
                                labelAnimation: "shimmer"
                                // labelOffset: 60
                            }, { static: true, top: 170, left: 250, type: "box" }),
                            // JavaScript Box
                            new gameObject.GameObject({
                                classPrefix: "box-",
                                float: true,
                                onHitBottom: boxHandlers.imageBox,
                                imageForBox: js_logo,
                                hits: 1,
                                label: "-->JavaScript (ES6)",
                                labelPosition: "fixed",
                                labelTop: "25px",
                                labelLeft: "15px",
                                labelAnimation: "shimmer"
                            }, { static: true, top: 170, left: 300, type: "box" }),
                            // CSS Box
                            new gameObject.GameObject({
                                classPrefix: "box-",
                                float: true,
                                onHitBottom: boxHandlers.imageBox,
                                imageForBox: css_logo,
                                hits: 1,
                                label: "-->CSS3",
                                labelPosition: "fixed",
                                labelTop: "35px",
                                labelLeft: "15px",
                                labelAnimation: "shimmer"
                            }, { static: true, top: 170, left: 350, type: "box" }),
                            // React JS Box
                            new gameObject.GameObject({
                                classPrefix: "box-",
                                float: true,
                                onHitBottom: boxHandlers.imageBox,
                                imageForBox: react_logo,
                                hits: 1,
                                label: "-->React JS",
                                labelPosition: "fixed",
                                labelTop: "45px",
                                labelLeft: "15px",
                                labelAnimation: "shimmer"
                            }, { static: true, top: 170, left: 400, type: "box" }),
                            // Backbone JS Box
                            new gameObject.GameObject({
                                classPrefix: "box-",
                                float: true,
                                onHitBottom: boxHandlers.imageBox,
                                imageForBox: backbone_logo,
                                hits: 1,
                                label: "-->BackBone JS",
                                labelPosition: "fixed",
                                labelTop: "55px",
                                labelLeft: "15px",
                                labelAnimation: "shimmer"
                            }, { static: true, top: 170, left: 450, type: "box" }),
                            // Webpack Logo
                            new gameObject.GameObject({
                                classPrefix: "box-",
                                float: true,
                                onHitBottom: boxHandlers.imageBox,
                                imageForBox: webpack_logo,
                                hits: 1,
                                label: "-->Webpack",
                                labelPosition: "fixed",
                                labelTop: "65px",
                                labelLeft: "15px",
                                labelAnimation: "shimmer"
                            }, { static: true, top: 170, left: 500, type: "box" }),
                            // Home tunnel
                            new gameObject.GameObject({
                                classPrefix: "tunnel-",
                                label: "Home",
                                route: "home"
                            }, { top: 1, left: 550, type: "tunnel" }),
                        ]
                    });

                    window.Game.stages.push(skillsStage);
                    window.Game.activeStage = window.Game.stages[window.Game.findStage(route)];
                }
            break;
            case "experience":
                let experienceStage = new stage.Stage({
                        name: "experience",
                        theme: "mountains",
                        targetOutletSelector: "#stage",
                        playerOutletId: "player",
                        gameObjects: [
                            // ground
                            new gameObject.GameObject({
                                classPrefix: "ground-center-"
                            },{ static: true, type: "ground" }),
                            // // About Box
                            // new gameObject.GameObject({
                            //     classPrefix: "box-",
                            //     float: true,
                            //     onHitBottom: boxHandlers.aboutBox,
                            //     hits: 1
                            // }, { static: true, top: 170, left: 250, type: "box" }),
                            // Home tunnel
                            new gameObject.GameObject({
                                classPrefix: "tunnel-",
                                label: "Home",
                                route: "home"
                            }, { top: 1, left: 400, type: "tunnel" }),
                        ]
                    });

                    window.Game.stages.push(experienceStage);
                    window.Game.activeStage = window.Game.stages[window.Game.findStage(route)];
            break;
        }

        if (route == "home") {
            route = "";
        }

        history.pushState({
            route: route,
        }, route, "/" + route);

        // load the player onto the stage
        // game is responsible for this since it's a React component
        // and his different requirements
        window.Game.loadPlayer();
    }
}