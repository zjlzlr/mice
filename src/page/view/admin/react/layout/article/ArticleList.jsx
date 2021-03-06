import React, { Component } from 'react';
import _ from "lodash";
import { browserHistory } from 'react-router'

import { ACTION_TYPE } from "../../../common/constants";
import { Alert, Table, TableToolbar } from "../../components";

export default class ArticleList extends Component {

    resultHandle(article){
        let { actions } = this.props;
        let { detail, actionType } = article;
        if(actionType === ACTION_TYPE.ARTICLE_DEL) {
            if(detail.errno === 0) {
                // 删除成功，重新加载列表
                detail.errmsg = "删除成功";
                actions.funcArticleList()
            } else {
                // 删除失败，显示错误信息
            }
            return <Alert>{detail.errmsg}</Alert>;
        }
        return ;
    }

    getTableColumn(){
        let columns = [
            {
                field: "title",
                text: "标题",
                width: "auto",
                func: this.showAddPage.bind(this),
                isShow: true,
                isSort: false
            },
            {
                field: "category_name",
                text: "类别",
                width: "100px",
                isShow: true,
                isSort: false
            },
            {
                field: "status",
                text: "状态",
                width: "70px",
                isShow: true,
                isSort: false
            },
            {
                field: "date",
                text: "创建时间",
                width: "150px",
                isShow: true,
                isSort: false
            }
        ];

        return columns;
    }

    getOptions(){
        let { actions } = this.props;
        return [
            {
                text: "删除",
                handle: actions.funcArticleDel
            }
        ];
    }

    showAddPage(id){
        let urlAdd = "/article/add", { history } = this.props;

        // 与添加文章操作使用一个函数
        // 如果调用这个函数没有传参数，第一个参数就是react自己的封装的event对象
        // id参数的类型如果是object，就不是传递过来的文章id
        if(typeof id !== "object") {
            urlAdd += "/" + id;
        }
        history.pushState(null, urlAdd);
    }

    getTableToolbar(){
        let { actions } = this.props;
        return [
            {
                text: "添加",
                handle: this.showAddPage.bind(this)
            }
        ];
    }
    
    render(){
        // debugger;
        let { actions, article } = this.props;
        let { articleList, detail, actionType } = article;
        
        let alert = this.resultHandle(article);
        let data = _.isEmpty(articleList) ? {} : articleList.data;
        return (
            <div>
                {alert}
                <Table 
                    data={data}
                    checkbox={true}
                    options={this.getOptions()}
                    toolbar={this.getTableToolbar()}
                    columns={this.getTableColumn()} 
                    searchHandle={actions.funcArticleList}
                />
            </div>
        );
    }
}
