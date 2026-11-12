// Longer write-ups for selected projects, keyed by project id.
// Content is drawn from each project's own README or report (see `source`).
// Section kinds: 'steps' renders a numbered sequence, 'points' a grid of titled notes.
export const caseStudies = {
  finrag: {
    summary:
      'Ask a question about a public company and get an answer where every claim traces back to the exact passage of the SEC filing it came from.',
    results: [
      { value: '<2s', label: 'to a cited answer' },
      { value: '<$0.002', label: 'per query, end to end' },
      { value: '6', label: 'ingestion steps streamed live' },
    ],
    sections: [
      {
        title: 'The problem',
        kind: 'text',
        paragraphs: [
          'EDGAR delivers filings as SGML bundles containing multiple documents, inline XBRL, and complex HTML tables. A naive text pipeline loses the table structure entirely, so a model reads garbled whitespace where the revenue figures should be.',
          'FinRAG Analyst uses a custom SGML parser to extract the primary document, then LlamaParse to keep financial tables intact as Markdown before anything is embedded.',
        ],
      },
      {
        title: 'Ingestion pipeline',
        kind: 'steps',
        items: [
          { title: 'Download', text: 'Pulls filings from SEC EDGAR by ticker and form type.' },
          { title: 'Extract', text: 'Parses the SGML bundle and extracts the primary HTM document.' },
          { title: 'Parse', text: 'Sends the document to LlamaParse for clean Markdown that preserves financial tables.' },
          { title: 'Chunk', text: 'Sentence-aware splitting at 1024 tokens with 200 overlap, so passages keep their context.' },
          { title: 'Embed', text: 'Batch-embeds with Cohere embed-english-v3.0 into 1024-dimension vectors.' },
          { title: 'Store', text: 'Upserts into Qdrant Cloud with ticker, form type, filing year, and section as filterable metadata.' },
        ],
      },
      {
        title: 'Decisions that mattered',
        kind: 'points',
        items: [
          {
            title: 'Idempotent re-ingestion',
            text: 'Chunks get deterministic UUID5 ids built from the accession number and chunk index. Re-running a filing never piles up duplicate vectors.',
          },
          {
            title: 'Faithfulness without a second LLM',
            text: 'Instead of paying for a judge model, faithfulness is the share of answer sentences with at least 30% word overlap against a source chunk. Cheap, fast, and a good signal for factual financial Q&A.',
          },
          {
            title: 'Reranking for precision',
            text: 'Cohere rerank-english-v3.0 reorders the retrieved passages before generation, which significantly improves what the model gets to read.',
          },
          {
            title: 'A pipeline you can watch',
            text: 'Each ingestion step publishes a Server-Sent Event. The browser shows every step completing with its timing instead of a blank spinner.',
          },
        ],
      },
    ],
    source: { label: 'Project README', href: 'https://github.com/sriram369/finrag-analyst#readme' },
  },

  wandr: {
    summary: 'No forms and no dropdowns. Describe the trip in one message and Wandr returns real flights, live stay prices, and a day-by-day plan.',
    results: [
      { value: '1', label: 'message to a full plan' },
      { value: '4', label: 'live searches run in parallel' },
      { value: '3', label: 'budget tiers per trip' },
    ],
    sections: [
      {
        title: 'What one message triggers',
        kind: 'steps',
        items: [
          {
            title: 'Intent extraction',
            text: 'Claude parses destination, dates, travelers, vibe, and budget from natural language, using the full conversation so a follow-up like "budget" works in context.',
          },
          {
            title: 'Parallel data fetch',
            text: 'Real flights from Google Flights, live hotel and Airbnb prices, attractions, and travel tips are all fetched at once.',
          },
          {
            title: 'Plan synthesis',
            text: 'Claude turns the results into a structured plan: itinerary, three budget tiers, top stays, top eats, and tips.',
          },
          {
            title: 'Refinement',
            text: 'Say "make it cheaper" or "add more beach days" and the plan updates without fetching everything again.',
          },
        ],
      },
      {
        title: 'Decisions that mattered',
        kind: 'points',
        items: [
          {
            title: 'Conversation over forms',
            text: 'Extraction reads the whole chat history, so later messages inherit the destination and dates from earlier ones.',
          },
          {
            title: 'Parallel async fetch',
            text: 'asyncio.gather runs every search concurrently. Total wait is the slowest single call, not the sum of all of them.',
          },
          {
            title: 'SerpApi over Amadeus',
            text: 'The Amadeus sandbox returns fake test data. SerpApi returns real Google Flights prices with actual airline names.',
          },
          {
            title: 'Tavily for stays',
            text: 'Airbnb removed its public API in 2020, so live listings from Airbnb and Booking.com come through Tavily search.',
          },
          {
            title: 'Refine without re-fetching',
            text: 'Follow-ups pass the existing plan to a separate refine prompt, so simple changes cost no extra API calls.',
          },
          {
            title: 'No invented flights',
            text: 'The flight results are always overwritten with what the search returned, so the model cannot make up flights when a search comes back empty.',
          },
        ],
      },
    ],
    source: { label: 'Project README', href: 'https://github.com/sriram369/vacation-planner#readme' },
  },

  chilly: {
    summary:
      'Ask Chilly about any public company and six specialized agents research it in parallel, then merge their findings into one equity research report.',
    results: [
      { value: '<90s', label: 'to a full report' },
      { value: '94%', label: 'human-rated report quality' },
      { value: '92%', label: 'directional accuracy, backtested' },
      { value: '$0', label: 'infrastructure cost' },
    ],
    sections: [
      {
        title: 'The six agents',
        kind: 'points',
        items: [
          { title: 'Market Data', text: 'Live price, volume, and fundamentals such as P/E, EPS, and market cap.' },
          { title: 'Technical Analysis', text: 'RSI, MACD, Bollinger Bands, and support and resistance levels.' },
          { title: 'SEC RAG', text: 'Queries FinRAG Analyst for insights grounded in 10-K and 10-Q filings.' },
          { title: 'ML Prediction', text: 'A Gradient-Boosting model for directional price prediction with a confidence score.' },
          { title: 'Sentiment', text: 'News and social sentiment scored across multiple sources.' },
          { title: 'Risk & Execution', text: 'Combines every agent output into the final risk assessment and report.' },
        ],
      },
      {
        title: 'How it stays reliable',
        kind: 'text',
        paragraphs: [
          'Every agent runs inside a LangGraph reflection loop: after it produces an output, the graph routes it through a critic step so the agent refines its own work before passing it downstream.',
          'Reports are delivered through a Telegram bot or exported as PDF, and the whole system runs on free-tier APIs and local compute.',
        ],
      },
    ],
    source: { label: 'Project README', href: 'https://github.com/sriram369/Chilly#readme' },
  },

  aurapath: {
    summary:
      'Standard navigation apps do not see the missing curb cuts, uneven pavement, and construction that decide whether a route is usable. AuraPath is designed to.',
    results: [
      { value: '100/100', label: 'project score' },
      { value: '4', label: 'phone sensors fused' },
      { value: '3', label: 'rollout phases planned' },
    ],
    sections: [
      {
        title: 'The problem',
        kind: 'text',
        paragraphs: [
          'Mainstream maps are built for car routes. They overlook the micro-barriers, such as cracked sidewalks, missing curb cuts, low-contrast signage, and temporary obstacles, that can make a path unsafe for someone with a visual or mobility impairment.',
          'The project report frames this as an accessibility gap affecting 67 million Americans living with disabilities.',
        ],
      },
      {
        title: 'Sensor Fusion Engine',
        kind: 'points',
        items: [
          { title: 'GPS', text: 'Macro-level location for initial route planning.' },
          { title: 'LiDAR', text: 'A real-time 3D depth map of the surroundings for precise obstacle and elevation detection.' },
          { title: 'Computer vision', text: 'The camera and a trained model recognize objects, read signs, and identify safe pedestrian pathways.' },
          { title: 'IMU sensors', text: 'Accelerometer and gyroscope track orientation and micro-movements to refine location and analyze surface quality.' },
        ],
      },
      {
        title: 'The journey, redesigned',
        kind: 'steps',
        items: [
          { title: 'Initiation', text: 'A simple voice command starts the trip.' },
          { title: 'Dynamic planning', text: 'The route is calculated on accessibility data, not just distance, avoiding known barriers.' },
          { title: 'Continuous scanning', text: 'The app scans the path as the user moves and catches obstacles that maps cannot see.' },
          { title: 'Adaptive guidance', text: 'Descriptive audio and haptic alerts guide the user around temporary obstructions in real time.' },
          { title: 'Feedback loop', text: 'On arrival the user rates the route, which improves it for everyone after them.' },
        ],
      },
      {
        title: 'Rollout plan',
        kind: 'steps',
        items: [
          { title: 'Campus launch', text: 'An MVP pilot with visually impaired students at Johns Hopkins University.' },
          { title: 'City integration', text: 'Citywide expansion in Baltimore, integrating public transit data.' },
          { title: 'Regional expansion', text: 'Major metropolitan areas such as Washington D.C., Boston, and New York.' },
        ],
      },
    ],
    source: { label: 'Project report (PDF)', href: '/AuraPath_Report.pdf' },
  },
}
