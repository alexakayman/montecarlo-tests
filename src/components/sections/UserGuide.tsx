import React from "react";

export function UserGuide() {
  return (
    <div className="prose prose-slate max-w-none">
      <style jsx>{`
        .prose {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, "Helvetica Neue", Arial, sans-serif;
          font-size: 1em;
          line-height: 1.8;
          margin-bottom: 0.5em;
        }

        h1,
        h2,
        h3,
        h4 {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, "Helvetica Neue", Arial, sans-serif;
          font-weight: 600;
        }

        h2 {
          font-size: 1.8em;
          margin-top: 1.5em;
          margin-bottom: 1em;
        }

        h3 {
          font-size: 1.5em;
          margin-top: 1.2em;
          margin-bottom: 1em;
        }

        h4 {
          font-size: 1.2em;
          margin-top: 1em;
          margin-bottom: 0.8em;
        }

        .prose ul {
          list-style-type: disc;
          padding-left: 1.5em;
          margin-top: 1.5em;
          margin-bottom: 1.5em;
        }

        .prose ul li {
          margin-top: 0.75em;
          margin-bottom: 0.75em;
        }

        .prose table {
          border-collapse: collapse;
          width: 100%;
          margin: 2em 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, "Helvetica Neue", Arial, sans-serif;
        }

        .prose th,
        .prose td {
          border: 1px solid #e5e7eb;
          padding: 1rem;
          text-align: left;
        }

        .prose th {
          background-color: #f9fafb;
          font-weight: 600;
          color: #374151;
        }

        .prose tr:nth-child(even) {
          background-color: #f9fafb;
        }

        .prose tr:hover {
          background-color: #f3f4f6;
        }

        .prose {
          color: #374151;
        }

        .prose strong {
          color: #111827;
        }

        .bg-yellow-50 {
          background-color: #fefce8;
        }

        .text-yellow-800 {
          color: #854d0e;
        }
      `}</style>

      <h1>Family Office Philanthropic Planning Guide</h1>

      <h2>What is Philanthropic Planning?</h2>
      <p>
        Philanthropic planning is the strategic approach to charitable giving
        that aligns a family&apos;s values, wealth management objectives, and
        desired social impact. For family offices, it involves creating a
        structured framework that optimizes giving while balancing:
      </p>
      <ul>
        <li>
          <strong>Family needs</strong> - ensuring sufficient wealth for future
          generations
        </li>
        <li>
          <strong>Charitable impact</strong> - maximizing the effectiveness of
          philanthropic capital
        </li>
        <li>
          <strong>Legacy considerations</strong> - preserving family values and
          engagement across generations
        </li>
      </ul>
      <p>
        This Monte Carlo simulation tool helps model various philanthropic
        strategies across multiple scenarios to identify optimal approaches for
        your family&apos;s unique situation.
      </p>

      <h2>How to Use This Tool</h2>

      <h3>Input Sections</h3>

      <h4>1. Asset Portfolio</h4>
      <p>This section captures your family&apos;s investment portfolio:</p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Description</th>
              <th>Recommended Input</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Asset ID</td>
              <td>Identifier for the asset</td>
              <td>E.g., &quot;US Equities&quot;, &quot;Bond Portfolio&quot;</td>
            </tr>
            <tr>
              <td>Asset Class</td>
              <td>Type of investment</td>
              <td>
                Select from: equity, fixedIncome, realEstate, privateEquity,
                hedge, cash
              </td>
            </tr>
            <tr>
              <td>Current Value</td>
              <td>Current market value</td>
              <td>Enter in dollars (e.g., 50000000 for $50M)</td>
            </tr>
            <tr>
              <td>Annual Return</td>
              <td>Expected annual return</td>
              <td>Enter as decimal (e.g., 0.07 for 7%)</td>
            </tr>
            <tr>
              <td>Annual Volatility</td>
              <td>Expected annual volatility</td>
              <td>Enter as decimal (e.g., 0.15 for 15%)</td>
            </tr>
            <tr>
              <td>ESG Aligned</td>
              <td>Whether asset follows ESG principles</td>
              <td>Toggle Yes/No</td>
            </tr>
            <tr>
              <td>Impact Focused</td>
              <td>Whether asset targets specific social outcomes</td>
              <td>Toggle Yes/No</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg my-4">
        <p className="text-yellow-800">
          <strong>Note:</strong> Impact-focused investments may accept slightly
          lower financial returns in exchange for measurable social outcomes.
        </p>
      </div>

      <h4>2. Charitable Vehicles</h4>
      <p>This section defines your philanthropic structures:</p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Description</th>
              <th>Recommended Input</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Vehicle ID</td>
              <td>Identifier for the vehicle</td>
              <td>E.g., &quot;Family Foundation&quot;, &quot;DAF&quot;</td>
            </tr>
            <tr>
              <td>Type</td>
              <td>Structure type</td>
              <td>
                Select from: privateFoundation, donorAdvisedFund,
                charitableTrust, directGiving, llc
              </td>
            </tr>
            <tr>
              <td>Current Value</td>
              <td>Current assets in vehicle</td>
              <td>Enter in dollars</td>
            </tr>
            <tr>
              <td>Annual Contribution</td>
              <td>Yearly planned addition</td>
              <td>Enter in dollars</td>
            </tr>
            <tr>
              <td>Admin Costs</td>
              <td>Annual administrative costs</td>
              <td>Enter as decimal (e.g., 0.01 for 1%)</td>
            </tr>
            <tr>
              <td>Distribution Requirement</td>
              <td>Minimum required payout</td>
              <td>Enter as decimal (e.g., 0.05 for 5%)</td>
            </tr>
            <tr>
              <td>Investment Strategy</td>
              <td>How assets are invested</td>
              <td>Select from: conservative, balanced, growth</td>
            </tr>
            <tr>
              <td>Cause Areas</td>
              <td>Focus areas for giving</td>
              <td>Enter comma-separated list</td>
            </tr>
            <tr>
              <td>Family Involvement</td>
              <td>Time commitment</td>
              <td>Hours per year from all family members</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4>Vehicle Types Explained:</h4>
      <ul>
        <li>
          <strong>Private Foundation:</strong> Offers maximum control but has 5%
          minimum distribution requirement and higher administrative costs
        </li>
        <li>
          <strong>Donor-Advised Fund (DAF):</strong> Lower administrative
          burden, immediate tax benefits, but less control over grants
        </li>
        <li>
          <strong>Charitable Trust:</strong> Can provide income to family and
          charity with different tax benefits depending on structure
        </li>
        <li>
          <strong>Direct Giving:</strong> Simple but lacks strategic
          coordination and ongoing structure
        </li>
        <li>
          <strong>Philanthropic LLC:</strong> Maximum flexibility but fewer tax
          advantages than traditional charitable vehicles
        </li>
      </ul>

      <h4>3. Family Members</h4>
      <p>
        This section captures the family composition and philanthropic
        interests:
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Description</th>
              <th>Recommended Input</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Member ID</td>
              <td>Identifier for family member</td>
              <td>E.g., &quot;Founder&quot;, &quot;Child-1&quot;</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>Current age</td>
              <td>Enter in years</td>
            </tr>
            <tr>
              <td>Life Expectancy</td>
              <td>Expected lifespan</td>
              <td>Typically 80-90 depending on health factors</td>
            </tr>
            <tr>
              <td>Annual Income</td>
              <td>Yearly income</td>
              <td>Enter in dollars</td>
            </tr>
            <tr>
              <td>Annual Expenses</td>
              <td>Yearly spending needs</td>
              <td>Enter in dollars</td>
            </tr>
            <tr>
              <td>Philanthropic Interest</td>
              <td>Level of engagement in philanthropy</td>
              <td>Enter as decimal from 0-1 (0=none, 1=very high)</td>
            </tr>
            <tr>
              <td>Cause Areas</td>
              <td>Charitable interests</td>
              <td>Enter comma-separated list</td>
            </tr>
            <tr>
              <td>Time Commitment</td>
              <td>Hours devoted to philanthropy</td>
              <td>Hours per year</td>
            </tr>
            <tr>
              <td>Successor Flag</td>
              <td>Whether likely to lead philanthropy</td>
              <td>Toggle Yes/No</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4>4. Simulation Parameters</h4>
      <p>These controls adjust the overall simulation:</p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Description</th>
              <th>Recommended Input</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Simulation Years</td>
              <td>Time horizon to model</td>
              <td>Typically 20-50 years</td>
            </tr>
            <tr>
              <td>Withdrawal Rate</td>
              <td>Annual giving as % of assets</td>
              <td>Typically 3-5% (0.03-0.05)</td>
            </tr>
            <tr>
              <td>Philanthropic Allocation</td>
              <td>% of wealth for philanthropy</td>
              <td>Typically 10-50% (0.1-0.5)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Understanding the Results</h2>
      <p>The simulation provides several key outputs:</p>
      <ol>
        <li>
          <strong>Philanthropic Impact:</strong> Estimated total social impact
          created
        </li>
        <li>
          <strong>Family Wealth:</strong> Projected family assets after the
          simulation period
        </li>
        <li>
          <strong>Sustainability Score:</strong> Likelihood the strategy can
          continue without depleting assets
        </li>
        <li>
          <strong>Optimal Vehicle Mix:</strong> Recommended allocation across
          different charitable structures
        </li>
        <li>
          <strong>Successor Readiness:</strong> How prepared the next generation
          is to continue the mission
        </li>
        <li>
          <strong>Optimal Withdrawal Rate:</strong> Sustainable annual giving
          rate
        </li>
        <li>
          <strong>Perpetuity Probability:</strong> Likelihood of maintaining
          giving indefinitely
        </li>
      </ol>

      <h2>Charts and Visualizations</h2>
      <ul>
        <li>
          <strong>Asset Projection Chart:</strong> Shows projected growth of
          family and philanthropic assets
        </li>
        <li>
          <strong>Giving Projection:</strong> Illustrates annual charitable
          distributions over time
        </li>
        <li>
          <strong>Vehicle Mix Pie Chart:</strong> Displays optimal allocation
          across charitable vehicles
        </li>
        <li>
          <strong>Key Metrics Dashboard:</strong> Summarizes critical
          performance indicators
        </li>
      </ul>

      <h2>Common Scenarios and Strategies</h2>

      <h3>Balancing Family and Philanthropy</h3>
      <p>
        For those prioritizing both family financial security and philanthropic
        impact:
      </p>
      <ul>
        <li>Start with a lower philanthropic allocation (15-25%)</li>
        <li>Use a more conservative withdrawal rate (3-4%)</li>
        <li>Consider donor-advised funds for flexibility</li>
      </ul>

      <h3>Creating Multi-generational Impact</h3>
      <p>For those focused on long-term legacy:</p>
      <ul>
        <li>Implement a mix of vehicles with private foundation as core</li>
        <li>Keep withdrawal rate at or below 4%</li>
        <li>Focus on successor engagement strategies</li>
      </ul>

      <h3>Maximizing Near-term Impact</h3>
      <p>For those wanting to see impact during their lifetime:</p>
      <ul>
        <li>Consider higher withdrawal rates (5-7%)</li>
        <li>Utilize direct giving alongside structured vehicles</li>
        <li>Focus on measurable outcomes in specific cause areas</li>
      </ul>

      <h2>Best Practices</h2>
      <ol>
        <li>
          <strong>Revisit annually:</strong> Philanthropic strategy should be
          reviewed yearly
        </li>
        <li>
          <strong>Involve next generation early:</strong> Build engagement
          through participation
        </li>
        <li>
          <strong>Measure impact:</strong> Define clear metrics for
          philanthropic outcomes
        </li>
        <li>
          <strong>Align investments:</strong> Consider mission-aligned investing
          alongside grantmaking
        </li>
        <li>
          <strong>Balance structure and flexibility:</strong> Maintain room to
          respond to emerging needs
        </li>
      </ol>
      <p>
        By thoughtfully configuring this simulation, you can develop a
        philanthropic strategy that creates meaningful impact while honoring
        your family&apos;s values and financial needs.
      </p>
    </div>
  );
}
