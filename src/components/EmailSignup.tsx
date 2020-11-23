import React, { ReactElement } from 'react';

import mailchimp from 'mailchimp';

import styles from './EmailSignup.module.less';

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
    <div className={styles.container}>
      <form
        action={`https://${account}.${shard}.list-manage.com/subscribe/post?u=${u}&id=${id}`}
        method="post"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={styles.inner}>
          <label htmlFor="email">{props.callToAction}</label>
          <span className={styles.inputSection}>
            <input
              id="email"
              type="email"
              name="EMAIL"
              placeholder="Your email"
              required
            />
            <span className={styles.hidden} aria-hidden>
              <input type="text" name={fakeField} tabIndex={-1} />
            </span>
            <input type="submit" name="subscribe" value="Sign me up!" />
          </span>
          <div className={styles.disclaimer}>
            {"I won't share your email with anyone. "}
            <a href={`http://${shard}.campaign-archive2.com/home/?u=${u}&id=${id}`}>
              See previous emails.
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
