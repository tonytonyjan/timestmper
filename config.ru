# frozen_string_literal: true

use Rack::Static, urls: ['/'], index: 'index.html', root: 'public', header_rules: [[:all, {
  'Cross-Origin-Embedder-Policy' => 'require-corp',
  'Cross-Origin-Opener-Policy' => 'same-origin'
}]]

run ->(_env) { [404, {}, []] }
