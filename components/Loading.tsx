import * as React from 'react'

export const Loading: React.FC = () => (
  <div id="loading-box">
    <div className="loading-left-bg"/>
    <div className="loading-right-bg"/>
    <div className="wizard-scene">
      <div className="wizard-objects">
        <div className="wizard-square"/>
        <div className="wizard-circle"/>
        <div className="wizard-triangle"/>
      </div>
      <div className="wizard">
        <div className="wizard-body"/>
        <div className="wizard-right-arm">
          <div className="wizard-right-hand"/>
        </div>
        <div className="wizard-left-arm">
          <div className="wizard-left-hand"/>
        </div>
        <div className="wizard-head">
          <div className="wizard-beard"/>
          <div className="wizard-face">
            <div className="wizard-adds"/>
          </div>
          <div className="wizard-hat">
            <div className="wizard-hat-of-the-hat"/>
            <div className="wizard-four-point-star --first"/>
            <div className="wizard-four-point-star --second"/>
            <div className="wizard-four-point-star --third"/>
          </div>
        </div>
      </div>
    </div>
  </div>
)
