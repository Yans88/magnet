import React, { Fragment } from "react";

export const Pernyataan3 = ({
  children,
  namaBank,
  atasNama,
  cabang,
  noRek,
  noRekUSD,
  ...otherProps
}) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <Fragment>
      <tr>
        <td>
          <p>Bank</p>
        </td>
        <td>
          <p>: </p>
        </td>
        <td>
          <p>
            <strong>
              BCA CAB.VETERAN SURABAYA, A/N.PT.VICTORY INTERNATIONAL FUTURES
            </strong>
          </p>
        </td>
      </tr>
      <tr>
        <td>
          <p>No.Rekening Terpisah</p>
        </td>
        <td>
          <p>: </p>
        </td>
        <td>
          <p>
            <strong>0101.61.6699 (IDR)</strong>
          </p>
        </td>
      </tr>
      <tr>
        <td>
          <p>No.Rekening Terpisah</p>
        </td>
        <td>
          <p>: </p>
        </td>
        <td>
          <p>
            <strong>0101.61.2588 (USD)</strong>
          </p>
        </td>
      </tr>
    </Fragment>
  );
};

export default Pernyataan3;
