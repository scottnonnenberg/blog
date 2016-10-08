import React from 'react';

import mailchimpFile from 'mailchimp';

export default function EmailSignup(props) {
  const mailchimp = props.mailchimp || mailchimpFile;
  const { text } = props;
  const keys = Object.keys(mailchimp);
  if (!keys.length) {
    return null;
  }

  const { account, shard, u, id, fakeField } = mailchimp;

  return <div className="call-to-action-box">
    <form
      action={`https://${account}.${shard}.list-manage.com/subscribe/post?u=${u}&id=${id}`}
      method="post"
      style={{
        marginBottom: 0,
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      <label htmlFor="email">{text}</label>
      <input
        id="email"
        type="email"
        name="EMAIL"
        placeholder="email address"
        required
      />
      <span
        style={{
          position: 'absolute',
          left: '-5000px',
        }}
        aria-hidden
      >
        <input
          type="text"
          name={fakeField}
          tabIndex="-1"
        />
      </span>
      <input
        type="submit"
        name="subscribe"
        value="Sign me up!"
      />
    </form>
  </div>;
}

EmailSignup.propTypes = {
  text: React.PropTypes.string.isRequired,
  mailchimp: React.PropTypes.object,
};
