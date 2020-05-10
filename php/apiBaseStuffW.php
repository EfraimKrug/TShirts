<?php
require 'apikyStuff.php';

use Exception;


/**
 * Generic API exception
 */
class PrintfulException extends Exception
{
    /**
     * Last response from API that triggered this exception
     *
     * @var string
     */
    public $rawResponse;
}

class PrintfulApiException extends PrintfulException
{
}



################################################################
## PrintfulApiClient
################################################################
class PrintfulApiClient
{
  /**
   * Printful API key
   * @var string
   */
  // private $key = $apiKey;

  private $lastResponseRaw;

  private $lastResponse;

  public $url = 'https://api.printful.com/';

  const USER_AGENT = 'Printful PHP API SDK 2.0';

  /**
   * Maximum amount of time in seconds that is allowed to make the connection to the API server
   * @var int
   */
  public $curlConnectTimeout = 20;

  /**
   * Maximum amount of time in seconds to which the execution of cURL call will be limited
   * @var int
   */
  public $curlTimeout = 20;

}
echo "<br>HERE";

?>
