import aiohttp

class DuckChatExepction(aiohttp.client.ClientError):
     """
     Base Exception for DuckChat
     """


class RateLimitExceeded(DuckChatExepction):
    """
    Exception raised when the rate limit is exceeded
    """
    
class DuckChatError(DuckChatExepction):
    """
    Exception raised when DuckChat returns an error
    """
    
class DuckChatConnectionError(DuckChatExepction):
    """
    Exception raised when DuckChat returns a connection error
    """
    
class DuckChatTimeout(DuckChatExepction):
    """
    Exception raised when DuckChat returns a timeout
    """