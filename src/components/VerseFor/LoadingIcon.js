import React from 'react';

export default class LoadingIcon extends React.Component {
  render() {
    return (
      <div>
        <div className="loadingIcon">
          <div className="loading loading-1"></div>
          <div className="loading loading-2"></div>
          <div className="loading loading-3"></div>
          <div className="loading loading-4"></div><br />
        </div>
      </div>
    )
  }
}
