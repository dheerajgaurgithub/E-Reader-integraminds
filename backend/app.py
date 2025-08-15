from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Import routes
from routes.auth import auth_bp
from routes.books import books_bp
from routes.reading_history import history_bp

# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key-change-this')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES', 3600))  # 1 hour by default
    
    # Initialize extensions
    jwt = JWTManager(app)
    
    # Configure CORS using Flask-CORS with specific settings
    from flask_cors import CORS
    
    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": [
                    "https://e-reader-integraminds-figg.vercel.app",
                    "http://localhost:3000",
                    "http://localhost:5000"
                ],
                "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                "allow_headers": ["Content-Type", "Authorization"],
                "supports_credentials": True,
                "vary_header": True
            }
        },
        supports_credentials=True
    )
    
    # Add a simple CORS preflight handler
    @app.before_request
    def handle_preflight():
        if request.method == 'OPTIONS':
            response = jsonify({"status": "preflight"})
            response.headers.add('Access-Control-Max-Age', '600')
            return response, 200
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(books_bp, url_prefix='/api')
    app.register_blueprint(history_bp, url_prefix='/api')
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Endpoint not found'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Internal server error'}), 500
    
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify({'error': 'Token has expired'}), 401
    
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({'error': 'Invalid token'}), 401
    
    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({'error': 'Authorization token is required'}), 401
    
    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({
            'status': 'healthy',
            'message': 'E-Reader API is running',
            'deployment': {
                'status': 'success',
                'timestamp': '2025-08-15T07:57:26+05:30',
                'message': 'Successfully deployed to Render',
                'version': '1.0.0',
                'environment': os.getenv('FLASK_ENV', 'production')
            }
        }), 200
    
    return app

app = create_app()

# Root route
@app.route('/')
def root():
    return '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>E-Reader API</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                max-width: 800px;
                margin: 0 auto;
                padding: 2rem;
                color: #333;
            }
            h1 { color: #2c3e50; }
            .endpoint {
                background: #f8f9fa;
                padding: 1rem;
                border-radius: 5px;
                margin: 1rem 0;
                font-family: monospace;
            }
            .success { color: #2ecc71; }
        </style>
    </head>
    <body>
        <h1>E-Reader API</h1>
        <p>Welcome to the E-Reader API service. The API is up and running!</p>
        
        <h2>Available Endpoints:</h2>
        
        <div class="endpoint">
            <strong>GET /api/health</strong> - Check API status
            <div><a href="/api/health" target="_blank">Try it</a></div>
        </div>
        
        <div class="endpoint">
            <strong>POST /api/auth/register</strong> - Register a new user
        </div>
        
        <div class="endpoint">
            <strong>POST /api/auth/login</strong> - User login
        </div>
        
        <div class="endpoint">
            <strong>GET /api/books</strong> - Get all books
        </div>
        
        <p class="success">✓ API Service is running</p>
    </body>
    </html>
    '''

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
