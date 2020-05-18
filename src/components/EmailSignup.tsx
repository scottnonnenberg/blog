import React, { ReactElement } from 'react';

import mailchimp from 'mailchimp';

type PropsType = {
  callToAction: string;
};

export default function EmailSignup(props: PropsType): ReactElement | null {
  const keys = Object.keys(mailchimp);
  if (!keys.length) {
    return null;
  }

  const { account, shard, u, id, fakeField } = mailchimp;

  return (
    <div className="call-to-action-box">
      <form
        action={`https://${account}.${shard}.list-manage.com/subscribe/post?u=${u}&id=${id}`}
        method="post"
        style={{
          marginBottom: 0,
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div style={{ display: 'inline-block' }}>
          <label htmlFor="email">{props.callToAction}</label>
          <span style={{ whiteSpace: 'nowrap' }}>
            <input
              id="email"
              type="email"
              name="EMAIL"
              placeholder="Your email"
              required
            />
            <span
              style={{
                position: 'absolute',
                left: '-5000px',
              }}
              aria-hidden
            >
              <input type="text" name={fakeField} tabIndex={-1} />
            </span>
            <input type="submit" name="subscribe" value="Sign me up!" />
          </span>
          <div
            className="disclaimer"
            style={{
              marginTop: '0.25em',
              lineHeight: 1,
              fontSize: '0.6em',
            }}
          >
            I won&apos;t share your email with anyone.{' '}
            <a href={`http://${shard}.campaign-archive2.com/home/?u=${u}&id=${id}`}>
              See previous emails.
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
