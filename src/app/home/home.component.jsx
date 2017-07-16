import React, { Component } from 'react';
import Trianglify from 'trianglifynocanvas';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {

    triPattern;
    resizeCallback;

    constructor() {
        super();

        this.triPattern = this.createNewTrianglify();

        this.resizeCallback = window.addEventListener('resize', () => {
            const ele = document.getElementsByTagName('svg')[0];
            if (!ele) { return; }
            document.body.replaceChild(this.createNewTrianglify(), ele);
        });

        requestIdleCallback(() => document.body.appendChild(this.createNewTrianglify()));
    }

    createNewTrianglify() {
        return Trianglify({
            height: window.innerHeight,
            width: window.innerWidth,
            // x_colors: 'RdBu'
            x_colors: 'RdYlBu'
        }).svg({ includeNamespace: true });
    }

    render() {
        return (
            <div id="app" className="home-container">
                <h1 className="title">Time-Recording <span className="fa fa-clock-o"></span></h1>
                <p className="add-text">Ever wondered where your time is gone?</p>
                <div className="track-start">
                    <button>
                        <Link to="/TimerList">Track It!</Link>
                    </button>
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        window.removeEventListener(this.resizeCallback);
    }
}