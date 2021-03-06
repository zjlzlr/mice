import React, { Component } from 'react';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { NavBar } from "./index"

export default class Header extends Component {

    renderOldNav(){
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#/">后台</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavDropdown eventKey={1} title="内容管理" id="basic-nav-dropdown">
                        <MenuItem eventKey={1.1} href="#/article">文章管理</MenuItem>
                        <MenuItem divider/>
                        <MenuItem eventKey={1.2} href="#/category">分类管理</MenuItem>
                        <MenuItem eventKey={1.3} href="#/tags">标签管理</MenuItem>
                    </NavDropdown>
                    <NavItem eventKey={2} href="#">权限管理</NavItem>
                    <NavItem eventKey={3} href="#">系统设置</NavItem>
                </Nav>
            </Navbar>
        );
    }

    renderNavBar(){
        let navData = [
            {
                "name": "首页",
                "href": ""
            },
            {
                "name": "内容管理",
                "href": "",
                "child": [
                    {
                        "name": "文章管理",
                        "href": ""
                    },
                    {
                        "name": "分类管理",
                        "href": ""
                    }
                ]
            },
            {
                "name": "权限管理",
                "href": ""
            }
        ];
        return (
            <NavBar navData={navData}/>
        );
    }

    render() {
        return (
            <div>
            { this.renderOldNav() }
            </div>
        )
    }
}
