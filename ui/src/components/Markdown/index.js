import React, { Component } from 'react';
import PropTypes from 'prop-types';
import remark from 'remark';
import reactRenderer from 'remark-react';
import toc from 'remark-toc';
import slug from 'remark-slug';
import autoLinkHeadings from 'remark-autolink-headings';
import RemarkLowlight from 'remark-react-lowlight';
import merge from 'deepmerge';
import github from 'hast-util-sanitize/lib/github.json';

// Custom Overrides
import WikiLink from 'components/WikiLink';
import WikiImage from 'components/WikiImage';

// TODO: maybe just load all of the langs?
import js from 'highlight.js/lib/languages/javascript';
import sql from 'highlight.js/lib/languages/sql';
import ruby from 'highlight.js/lib/languages/ruby';
import xml from 'highlight.js/lib/languages/xml';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import css from 'highlight.js/lib/languages/css';
import elm from 'highlight.js/lib/languages/elm';

import 'highlight.js/styles/tomorrow-night.css';

// Allow the 'className' prop to pass through
const schema = merge(github, {
  clobberPrefix: '',
  attributes: { '*': ['className'] },
});

class Markdown extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return remark()
      .use(slug)
      .use(autoLinkHeadings)
      .use(toc)
      .use(reactRenderer, {
        sanitize: schema,
        remarkReactComponents: {
          a: WikiLink,
          img: WikiImage,
          code: RemarkLowlight({
            js,
            sql,
            ruby,
            xml,
            python,
            java,
            css,
            elm,
          }),
        },
      })
      .processSync(this.props.children).contents;
  }
}

export default Markdown;
