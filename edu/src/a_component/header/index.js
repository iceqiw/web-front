/** Footer 页面底部 **/
import React from "react";
import css from "./index.scss";

export default class Footer extends React.PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={css.footer}>
        © 2018{" "}
        <a href="http://qiwei" target="_blank" rel="noopener noreferrer">
         qiwei
        </a>, Inc.
      </div>
    );
  }
}
