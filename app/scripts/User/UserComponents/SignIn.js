import React from "react";
import gapi from "gapi";
import $ from 'jquery';

let idSuffixCount = 0;

export default class SignIn extends React.Component {
    constructor() {
        super();
        this.id = 'User-UserComponents-SignIn.js-' + idSuffixCount++;
        this.state = {
        };
    }
    
    componentDidMount() {
        gapi.signin2.render(this.id, {
            scope: "profile email",
            onsuccess : (googleUser) => {
                $.ajax({
                    url: '/api/login',
                    dataType: 'json',
                    type: 'POST',
                    data: {id_token: googleUser.getAuthResponse().id_token}
                })
                .done(function(result) {
                    this.props.onSignIn(googleUser);
                    var profile = googleUser.getBasicProfile();
                    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
                    console.log('Name: ' + profile.getName());
                    console.log('Image URL: ' + profile.getImageUrl());
                    console.log('Email: ' + profile.getEmail());
                }.bind(this))
                .fail(function(xhr, status, errorThrown) {
                    console.error('api/login', status, errorThrown.toString());
                }.bind(this));
        },
            onfailure: () => {
                alert("Failed to login");
            }
        });
    }
    
    static get defaultProps() {
        return {
            onSignIn: () => {},
        };
    }

    render() {
        return (
            <div id={this.id} data-theme="dark"/>
        );
    }
}
