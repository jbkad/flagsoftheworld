const Header: React.FC = () => {
    return (
      <div className='header'>
        <div className="title">
          <h3>Flags Around <br /> The World 🌍</h3>
          <a
            href="https://github.com/jbkad/"
            target='_blank' 
            rel="noreferrer"
          >
            By Joyce Kadibu
          </a>
        </div>

        <div className="help-btn">
          <span className="text-body">Beta</span> 
        </div>
      </div>
    )
  }
  
  export default Header